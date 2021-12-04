def construct_es_data(image_file,es_id)
  human_label_key = es_id + '_human_label'
  '{"image_file":"' + image_file + '",'+'"es_id":"' + es_id + '",' + '"auto_label":"",' + '"' + human_label_key+'"' + ':"empty"}'
end

def execute_command(cmd)
  `#{cmd}`
end
