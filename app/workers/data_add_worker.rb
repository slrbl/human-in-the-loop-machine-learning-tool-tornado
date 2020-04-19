class DataAddWorker
  include Sidekiq::Worker
  include Sidekiq::Status::Worker
  include SidekiqStatus::Worker
  require 'csv'

  def perform(data_set_id)
    puts data_set_id
    data_set = Dataset.find(data_set_id)
    data = CSV.read(data_set.path, { encoding: "ISO-8859-1", headers: true, converters: :all})
    data_hash = data.map { |data_unit| data_unit.to_hash }
    data_hash.each do |line|
      es_ready = '{'
      data.headers.each do |col|
        line_non_return = line[col].to_s.gsub("\"","MMMM")
        es_ready = es_ready + '"' + col + '":"' + line_non_return + '",' unless col == nil
      end
      es_ready = es_ready + '"es_id":"'+data_set.es_id + '",'
      human_label_key = data_set.es_id + '_human_label'
      es_ready = es_ready + '"auto_label":"",' + '"'+human_label_key+'"' + ':"empty",'
      es_ready[-1] = ''
      es_ready = es_ready + '}'
      data_set.update(:status => 'processing')
      RestClient.post(ES_SERVER + ES_INDEX ,es_ready,:content_type => 'application/json')
      data_set.update(:inputs_count => data_hash.count)
     #data_set.update(:status => "ready")

  end
end
end
