class DataController < ApplicationController
  require 'csv'
  require 'net/http'
  require 'uri'
  require 'json'
  require 'net/https'
  require 'securerandom'
  require 'rest-client'


  def new
    @dataset = Dataset.new()
  end


  def create
    # Save data file
    save_data_file(params[:file])
    created_dataset = Dataset.create(
      :name => params[:dataset][:name],
      :description => params[:dataset][:description],
      :es_id => SecureRandom.hex(16),
      :path => Rails.root.join('public', 'uploads', params[:file].original_filename),
      :user_id => current_user.id
    )
    # Save data in Elasticseach
    data = CSV.read(created_dataset.path, { encoding: "UTF-8", headers: true, converters: :all})
    hashed_data = data.map { |data_unit| data_unit.to_hash }
    hashed_data.each do |line|
      es_ready = '{'
      data.headers.each do |col|
        line_non_return = line[col].to_s.sub("\"","MMMM")
        es_ready = es_ready + '"' + col + '":"' + line_non_return + '",' unless col == nil
      end
      es_ready = es_ready + '"es_id":"'+created_dataset.es_id + '",'
      human_label_key = created_dataset.es_id + '_human_label'
      es_ready = es_ready + '"auto_label":"",' + '"'+human_label_key+'"' + ':"empty",'
      es_ready[-1] = ''
      es_ready = es_ready + '}'
      RestClient.post(ES_SERVER + ES_INDEX ,es_ready,:content_type => 'application/json')
    end
    created_dataset.update(:inputs_count => hashed_data.count)
    sleep(2)
    redirect_to '/datas/' + created_dataset.id.to_s
  end


  def show
    @dataset = Dataset.find(params[:id])
    @human_label_key = @dataset.es_id + '_human_label'
    request = contruct_es_request(JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": @dataset.es_id } }]}},"size": 10000} ))
    response = make_http_request(request,es_uri,request_options)
    @data = JSON.parse(response.body)
  end


  def label
    @dataset = Dataset.find(params[:id])
    request = contruct_es_request(JSON.dump({"query":{"bool":{"must":[{"match":{"es_id": @dataset.es_id}}]}},"size":10000}))
    response = make_http_request(request,es_uri,request_options)
    @data = JSON.parse(response.body)
    if @data == nil
      redirect_to '/oops'
    end
  end


  def threshold
    @dataset = Dataset.find(params[:id])
    request = contruct_es_request(JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": @dataset.es_id  } }]}},"size": 1000} ))
    response = make_http_request(request,es_uri,request_options)
    @data = JSON.parse(response.body)
    auto_proba = []
    @max_proba = 0
    @min_proba = 1
    @data['hits']['hits'].each do |data|
      auto_proba.append(data['_source']['auto_proba'].to_f)
      if data['_source']['auto_proba'].to_f > @max_proba
        @max_proba = data['_source']['auto_proba'].to_f
      end
      if data['_source']['auto_proba'].to_f < @min_proba
        @min_proba = data['_source']['auto_proba'].to_f
      end
    end
  end


  def update_docs
    params.each do |param|
      if param.include?'doc_'
        doc_id = param.split('_')[1]
        doc_id = param.sub('doc_', '')
        human_label_key = Dataset.find(params[:data_id]).es_id + '_human_label'
        update_result = RestClient.post(ES_SERVER + ES_INDEX + '/' + doc_id + '/_update','{"doc":{"'+human_label_key+'":"'+params[param] + '"}}',:content_type => 'application/json') unless (params[param] == nil or params[param] == '')
        logger.debug(update_result)
      end
    end
    redirect_to '/datas/'+params[:data_id].to_s
  end


  def error
  end


  def download_data
    @dataset = Dataset.find(params[:id])
    if @dataset.user_id !=current_user.id
      redirect_to '/oops'
    end
    @human_label_key = @dataset.es_id + '_human_label'
    request = contruct_es_request(JSON.dump({"query":{"bool":{"must":[{"match":{"es_id": @dataset.es_id}}]}},"size": 10000}))
    response = make_http_request(request,es_uri,request_options)
    @data = JSON.parse(response.body)
    @csv = ""
    attributes = []
    @data['hits']['hits'][0]['_source'].each do |attribute|
      attributes << attribute[0]
      @csv += attribute[0]+','
    end
    @csv[-1] = "\n"
    @data['hits']['hits'].each do |data_unit|
      attributes.each do |attribute|
        @csv += data_unit['_source'][attribute].to_s+ ','
      end
      @csv[-1] = "\n"
    end
    send_data(@csv, :type => 'text/plain', :disposition => 'attachment', :filename => @dataset.name+'.csv')
  end

  def index

  end

  def edit
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

def save_data_file(file_param)
  File.open(Rails.root.join('public', 'uploads', file_param.original_filename), 'wb') do |file|
    file.write(file_param.read)
  end
end

end
