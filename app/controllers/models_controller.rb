class ModelsController < ApplicationController


  def proc

  end

  def index
  end

  def show
  end

  def edit
  end


  def new
    @dataset = Dataset.find(params[:id])
    request = contruct_es_request(JSON.dump({"query":{"bool":{"must":[{ "match":{ "es_id": @dataset.es_id}}]}},"size": 1000}))
    request_options = {use_ssl: es_uri.scheme == "https",}
    response = Net::HTTP.start(es_uri.hostname, es_uri.port, request_options) do |http|
      http.request(request)
    end
    @es_data = JSON.parse(response.body)
  end


  def create
    if params[:features].class == String
      features = {}
      params[:features].gsub(', ', ',').gsub('{', '').gsub('}', '').split(',').each do |current|
        key, value = current.split('=>')
        key = key.gsub('"', '')
        features[key] = value.gsub('"', '')
      end
    else
      features = params[:features]
    end
    sleep 30
    logger.debug("The selected features are:")
    logger.debug(features)
    selected_features = []
    features.each do |key,value|
      selected_features.append(key) unless value == '0'
    end
    logger.debug(selected_features)
    es_id = Dataset.find(params[:id]).es_id
    # create model
    human_label_key = es_id + '_human_label'
    if selected_features.length > 1
      cmd = "python train.py -f \"" + selected_features.join(',') + "\" -l "+human_label_key + " -i \"" + es_id + "\" -s \"" + ES_SERVER + ES_INDEX + "\""
    else
      cmd = "python train_nlp.py -f \""+selected_features.join(',') + "\" -l "+human_label_key + " -i \"" + es_id + "\" -s \"" + ES_SERVER + ES_INDEX + "\""
    end
    logger.debug(cmd)
    value = `#{cmd}`
    logger.debug(value)
    redirect_to '/datas/'+params[:id]
    # Parse the es dataset
    request = contruct_es_request(JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": es_id}},{ "match": { "es_id": es_id} }]}},"size": 2} ))
    request_options = {use_ssl: es_uri.scheme == "https",}
    response = Net::HTTP.start(es_uri.hostname, es_uri.port, request_options) do |http|
      http.request(request)
    end
    @es_data = JSON.parse(response.body)
  end

  private
  def contruct_es_request(body)
    request = Net::HTTP::Get.new(es_uri)
    request.content_type = "application/json"
    request.body = body
    request
  end

  def es_uri
    URI.parse(ES_SERVER + ES_INDEX + '/_search/')
  end

end
