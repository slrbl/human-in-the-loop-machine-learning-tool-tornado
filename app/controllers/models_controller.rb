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
    TrainModelWorker.perform_async(params[:features],params[:id])
    redirect_to '/datasets/'+params[:id]
    # Parse the es dataset
    #es_id = Dataset.find(params[:id]).es_id
    #request = contruct_es_request(JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": es_id}},{ "match": { "es_id": es_id} }]}},"size": 2} ))
    #response = make_http_request(request,es_uri,request_options)
    #@es_data = JSON.parse(response.body)
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
