class ModelsController < ApplicationController

  def new
    begin
      @dataset = Dataset.find(params[:id])
      uri = URI.parse(ES_SERVER + ES_INDEX + '/_search/')
      request = Net::HTTP::Get.new(uri)
      request.content_type = "application/json"
      request.body = JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": @dataset.es_id } }]}},"size": 1000} )
      req_options = {use_ssl: uri.scheme == "https",}
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end
      @es_data = JSON.parse(response.body)
    rescue
      redirect_to '/oops'
    end
  end


  def proc

  end


  def create
    begin
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
      puts features
      selected_features = []
      features.each do |key, value|
        selected_features.append(key) unless value == '0'
      end
      puts selected_features
      es_id = Dataset.find(params[:id]).es_id

      # Create model
      human_label_key = es_id + '_human_label'

      if selected_features.length>1
        cmd = "python train.py -f \"" + selected_features.join(',') + "\" -l "+human_label_key + " -i \"" + es_id + "\" -s \"" + ES_SERVER + ES_INDEX + "\""
      else
        cmd = "python train_nlp.py -f \""+selected_features.join(',') + "\" -l "+human_label_key + " -i \"" + es_id + "\" -s \"" + ES_SERVER + ES_INDEX + "\""
      end

      print cmd
      print "================================="
      value = `#{cmd}`
      puts value
      redirect_to '/datas/'+params[:id]

      # Parse the es dataset
      uri = URI.parse(ES_SERVER + ES_INDEX + '/_search/')
      request = Net::HTTP::Get.new(uri)
      request.content_type = "application/json"
      request.body = JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": es_id}},{ "match": { "es_id": es_id} }]}},"size": 2} )
      req_options = {use_ssl: uri.scheme == "https",}
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end
      @es_data = JSON.parse(response.body)
    rescue
      redirect_to '/oops'
    end
  end

  def index
  end

  def show
  end

  def edit
  end

end
