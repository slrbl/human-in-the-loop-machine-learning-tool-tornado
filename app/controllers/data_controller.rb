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
    @dataset = Dataset.create(
      :name => params[:dataset][:name],
      :description => params[:dataset][:description],
      :data_type => params[:dataset][:data_type].downcase,
      :es_id => SecureRandom.hex(16),
      :path => Rails.root.join('public', 'uploads', params[:file].original_filename),
      :user_id => current_user.id
    )
    # Save data in Elasticseach
    job_id = DataAddWorker.perform_async(@dataset.id)
    session[:creation_jobs] = {} unless session[:creation_jobs] != nil
    session[:creation_jobs][@dataset.id] = job_id
    sleep 10
    flash[:data_creation] = 'Your dataset is being processed'
    redirect_to '/datasets/' + @dataset.id.to_s
  end


  def show
    @dataset = Dataset.find(params[:id])

    if ((@dataset.user_id == current_user.id) or check_membership(current_user,@dataset))
      @human_label_key = @dataset.es_id + '_human_label'
      request = contruct_es_request(JSON.dump({"query":{"bool":{"must":[{"function_score": {"functions": [{"random_score": {"seed": rand(10000).to_s}}]}},{"match":{"es_id": @dataset.es_id}}]}},"size":10000}))
      response = make_http_request(request,es_uri,request_options)
      @data = JSON.parse(response.body)
    else
      redirect_to '/datasets', flash: { error: "Not authorized" }
    end
  end

  def seed
    @dataset = Dataset.find(params[:id])
    @human_label_key = @dataset.es_id + '_human_label'
    request = contruct_es_request(JSON.dump( {"query": {"bool": {"must": [{ "match": { "es_id": @dataset.es_id } }]}},"size": 10000} ))
    response = make_http_request(request,es_uri,request_options)
    @data = JSON.parse(response.body)
  end

  # Seed labelling view
  def label_data
    @size=params[:size].to_i
    @dataset = Dataset.find(params[:id])
    request = contruct_es_request(JSON.dump({"query":{"bool":{"must":[{"function_score": {"functions": [{"random_score": {"seed": rand(1000).to_s}}]}},{"match":{"es_id": @dataset.es_id}}]}},"size":10000}))
    response = make_http_request(request,es_uri,request_options)
    @data = JSON.parse(response.body)
  end


  def select_threshold
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
        if (params[param] != nil or params[param] != '')
          update_result = RestClient.post(
            ES_SERVER + ES_INDEX + '/' + doc_id + '/_update',
            '{"doc":{"'+human_label_key+'":"'+params[param] + '"}}',
            :content_type => 'application/json')
        end
        logger.debug(update_result)
      end
    end
    redirect_to '/seeds/'+params[:data_id].to_s
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
      if attribute[0]!="es_id" #and attribute[0]!="auto_proba" and !attribute[0].include?"_human_label"
      attributes << attribute[0]
      @csv += attribute[0]+','

    end
  end
    @csv[-1] = "\n"
    @data['hits']['hits'].each do |data_unit|
      attributes.each do |attribute|
         if attribute!="es_id" #and attribute!="auto_proba" and !attribute.include?"_human_label"
        if attribute == "text"
          cleaned = data_unit['_source'][attribute].to_s.gsub(",","")
          @csv += cleaned
        else
          @csv += data_unit['_source'][attribute].to_s+ ','
        end
      end
    end
      @csv[-1] = "\n"
    end


    send_data(@csv, :type => 'text/plain', :disposition => 'attachment', :filename => @dataset.name+'.csv')

end

  def index
    @user_datasets=[]
    #owned
    Dataset.where(:user_id => current_user.id).order('id DESC').each do |dataset|
      @user_datasets << dataset
    end

    #contributed
    current_user.memberships.each do |membership|
      @user_datasets << membership.dataset
    end


  end

  def edit
  end

private

def check_membership(user,dataset)
  user.memberships.each do |membership|
    if membership.dataset_id == dataset.id
      return true
    end
  end
  return false
end

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
