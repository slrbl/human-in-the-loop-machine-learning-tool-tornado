class DataAddWorker
  require 'sidekiq/api'
  require 'csv'
  require_relative 'helpers'
  include Sidekiq::Worker
  include Sidekiq::Status::Worker


  def perform(data_set_id)
    data_set = Dataset.find(data_set_id)
    if data_set.data_type == 'image'
      # treat image dataset here
      cmd_result = execute_command("unzip -q \""+data_set.path.sub!('/tornado/','')+"\" -d public/datasets/"+data_set.es_id)
      cmd_result = execute_command("find public/datasets/"+data_set.es_id+"/ -name \"*.*\" -exec mv {} public/datasets/"+data_set.es_id+" \\;")
      data_counter = 0
      data_set.update(:status => 'processing')
      Dir.glob('public/datasets/'+data_set.es_id+'/*.*').each do |image|
        image_file = image.split('/')[-1]
        human_label_key = data_set.es_id + '_human_label'
        RestClient.post(ES_SERVER + ES_INDEX ,construct_es_data(image_file,data_set.es_id),:content_type => 'application/json')
        data_counter += 1
      end
      data_set.update(:inputs_count => data_counter)
    else
      # Treat text and structured data
      data = CSV.read(data_set.path, { encoding: "ISO-8859-1", headers: true, converters: :all})
      data_hash = data.map { |data_unit| data_unit.to_hash }
      human_label_key = data_set.es_id + '_human_label'
      data_set.update(:status => 'processing')
      data_hash.each do |line|
        es_ready = '{'
        data.headers.each do |col|
          line_non_return = line[col].to_s.gsub("\"","MMMM")
          #line_non_return = line[col].to_s.gsub("\"","")
          es_ready = es_ready + '"' + col + '":"' + line_non_return + '",' unless col == nil
        end
        es_ready = es_ready + '"es_id":"' + data_set.es_id + '",' + '"auto_label":"",' + '"' + human_label_key + '"' + ':"empty"}'
        RestClient.post(ES_SERVER + ES_INDEX ,es_ready,:content_type => 'application/json')
        data_set.update(:inputs_count => data_hash.count)
      end
    end
  end

  def construct_es_data(image_file,es_id)
    human_label_key = es_id + '_human_label'
    '{"image_file":"' + image_file + '",'+'"es_id":"' + es_id + '",' + '"auto_label":"",' + '"' + human_label_key+'"' + ':"empty"}'
  end

  def execute_command(cmd)
    `#{cmd}`
  end

end
