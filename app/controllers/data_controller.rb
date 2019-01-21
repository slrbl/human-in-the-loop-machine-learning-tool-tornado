class DataController < ApplicationController
  require 'csv'
  require 'net/http'
  require 'uri'
  require 'json'
  require 'net/https'
  require 'securerandom'
  require 'rest-client'

  # GET
  def new
    begin
      @dataset = Dataset.new()
    rescue
      redirect_to '/oops'
    end
  end

  #ES_INDEX = '/tornado/data'

  # POST
  def create
    #begin
      File.open(Rails.root.join('public', 'uploads', params[:file].original_filename), 'wb') do |file|
        file.write(params[:file].read)
      end
      created_dataset = Dataset.create(:name => params[:dataset][:name], :description => params[:dataset][:description],:es_id => SecureRandom.hex(16),:path => Rails.root.join('public', 'uploads', params[:file].original_filename), :user_id => current_user.id)
      inputs_count = 0
      # Add the data to ES
      data = CSV.read(created_dataset.path, { encoding: "UTF-8", headers: true, converters: :all})
      hashed_data = data.map { |d| d.to_hash }
      hashed_data.each do |line|
        to_be_posted_to_es = '{'
        data.headers.each do |col|
          line_non_return = line[col].to_s.sub("\"","MMMM")
          to_be_posted_to_es = to_be_posted_to_es + '"' + col + '":"' + line_non_return + '",' unless col == nil
        end
        to_be_posted_to_es = to_be_posted_to_es + '"es_id":"'+created_dataset.es_id + '",'
        human_label_key = created_dataset.es_id + '_human_label'
        to_be_posted_to_es = to_be_posted_to_es + '"auto_label":"",' + '"'+human_label_key+'"' + ':"empty",'
        to_be_posted_to_es[-1] = ''
        to_be_posted_to_es = to_be_posted_to_es + '}'
        RestClient.post(ES_SERVER + ES_INDEX ,to_be_posted_to_es,:content_type => 'application/json')
        inputs_count += 1
      end
      created_dataset.update(:inputs_count => inputs_count)
      sleep(2)
      redirect_to '/datas/' + created_dataset.id.to_s
    """rescue
      redirect_to '/oops'
    end"""
  end


  def index
    begin
      require 'rest-client'
    rescue
      redirect_to '/oops'
    end
  end


  def edit
  end



  def show
    begin
      @dataset = Dataset.find(params[:id])
      @human_label_key = @dataset.es_id + '_human_label'
      uri = URI.parse(ES_SERVER + ES_INDEX+ '/_search/')
      request = Net::HTTP::Get.new(uri)
      request.content_type = "application/json"
      request.body = JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": @dataset.es_id } }]}},"size": 10000} )
      req_options = {use_ssl: uri.scheme == "https",}
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
            http.request(request)
      end
      @data = JSON.parse(response.body)
    rescue
      redirect_to '/oops'
    end
  end


  def label
    begin
    @dataset = Dataset.find(params[:id])
    uri = URI.parse(ES_SERVER + ES_INDEX + '/_search/')
    request = Net::HTTP::Get.new(uri)
    request.content_type = "application/json"
    request.body = JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": @dataset.es_id  } }]}},"size": 10000} )
    req_options = {use_ssl: uri.scheme == "https",}
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
      http.request(request)
    end
    @data = JSON.parse(response.body)
    if @data == nil
      redirect_to '/oops'
    end
    rescue
      redirect_to '/oops'
    end
  end


  def threshold
    begin
      @dataset = Dataset.find(params[:id])
      uri = URI.parse(ES_SERVER + ES_INDEX + '/_search/')
      request = Net::HTTP::Get.new(uri)
      request.content_type = "application/json"
      request.body = JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": @dataset.es_id  } }]}},"size": 1000} )
      req_options = {use_ssl: uri.scheme == "https",}
      response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
      end
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
    rescue
      redirect_to '/oops'
    end
  end


  def update_docs
    begin
      params.each do |param|
        if param.include?'doc_'
          doc_id = param.split('_')[1]
          doc_id = param.sub('doc_', '')
          human_label_key = Dataset.find(params[:data_id]).es_id + '_human_label'
          puts RestClient.post(ES_SERVER + ES_INDEX + '/' + doc_id + '/_update','{"doc":{"'+human_label_key+'":"'+params[param] + '"}}',:content_type => 'application/json') unless (params[param] == nil or params[param] == '')
        end
      end
      redirect_to '/datas/'+params[:data_id].to_s
    rescue
      redirect_to '/oops'
    end
  end

  def error
  end

  def download_data
    begin

    @dataset = Dataset.find(params[:id])
    if @dataset.user_id !=current_user.id
      redirect_to '/oops'
    end

    @human_label_key = @dataset.es_id + '_human_label'
    uri = URI.parse(ES_SERVER + ES_INDEX+ '/_search/')
    request = Net::HTTP::Get.new(uri)
    request.content_type = "application/json"
    request.body = JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": @dataset.es_id } }]}},"size": 10000} )
    req_options = {use_ssl: uri.scheme == "https",}
    response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
          http.request(request)
    end
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
  rescue
    redirect_to '/oops'
  end
  end


end
