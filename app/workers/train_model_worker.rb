class TrainModelWorker
  include Sidekiq::Worker

  def perform(params_features,dataset_id)

    if params_features.class == String
      features = {}
      params_features.gsub(', ', ',').gsub('{', '').gsub('}', '').split(',').each do |current|
        key, value = current.split('=>')
        key = key.gsub('"', '')
        features[key] = value.gsub('"', '')
      end
    else
      features = params_features
    end
    sleep 5
    logger.debug("The selected features are:")
    logger.debug(features)
    selected_features = []
    features.each do |key,value|
      selected_features.append(key) unless value == '0'
    end
    logger.debug(selected_features)
    es_id = Dataset.find(dataset_id).es_id
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

  end
end
