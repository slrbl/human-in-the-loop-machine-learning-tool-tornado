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
    response = make_http_request(request,es_uri,request_options)
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
    sleep 5
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
      training_script_args = selected_features.join(',') + "\" -l "+human_label_key + " -i \"" + es_id + "\" -s \"" + ES_SERVER + ES_INDEX + "\""
      cmd = "python train.py -f \"" + training_script_args
    else
      cmd = "python train_nlp.py -f \"" + training_script_args
    end
    logger.debug("Training script launched: " + cmd)
    cmd_result = `#{cmd}`
    logger.debug(cmd_result)
    redirect_to '/datasets/'+params[:id]
    # Parse the es dataset
    request = contruct_es_request(JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": es_id}},{ "match": { "es_id": es_id} }]}},"size": 2} ))
    response = make_http_request(request,es_uri,request_options)
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


  def request_options
    {use_ssl: es_uri.scheme == "https"}
  end


  def make_http_request(request,uri,options)
    response = Net::HTTP.start(uri.hostname, uri.port, options) do |http|
      http.request(request)
    end
    response
  end


end
