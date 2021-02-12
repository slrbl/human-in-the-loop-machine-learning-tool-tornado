class TrainModelWorker
  include Sidekiq::Worker
  def perform(params_features,dataset_id)
    data_set=Dataset.find(dataset_id)
    if params_features.class == String
      # Create a bag of words to train a NLP text classififcation model
      features = {}
      params_features.gsub(', ', ',').gsub('{', '').gsub('}', '').split(',').each do |current|
        key, value = current.split('=>')
        key = key.gsub('"', '')
        features[key] = value.gsub('"', '')
      end
    else
      # Get the list of features
      features = params_features
    end
    sleep 5
    logger.debug("The selected features are:{}"+features.to_s)
    selected_features = []
    features.each do |key,value|
      selected_features.append(key) unless value == '0'
    end
    logger.debug(selected_features)
    es_id = Dataset.find(dataset_id).es_id
    # Train the model
    human_label_key = es_id + '_human_label'

    logger.debug("=========================================================")

    if selected_features.length >= 1
      training_script_args = selected_features.join(',') + "\" -l "+human_label_key + " -i \"" + es_id + "\" -s \"" + ES_SERVER + ES_INDEX + "\""
      cmd = "python ML/train.py -f \"" + training_script_args
    else
      cmd = "python ML/train_nlp.py -f \"" + training_script_args
    end
    logger.debug("Training script launched witht the following command: " + cmd)
     data_set.update(:status => 'labelling')
    cmd_result = `#{cmd}`
    logger.debug(cmd_result)
  end
end
