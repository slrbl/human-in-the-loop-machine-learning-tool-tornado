
echo 'Launching Elasticsearch..'
if [ "$(ps -eaf | grep tornado_data | grep elasticsearch | wc -l | grep '1')" == "" ]; then
  nohup ./tornado_data/*elastic*/bin/elasticsearch > /tmp/es_tornado.log 2>&1 &
  if [ "$(ps -eaf | grep tornado_data | grep elasticsearch | wc -l | grep '1')" == "" ]; then
    echo 'Something went wrong launching elasticsearch.'
  else
    echo 'Elasticsearch has successfully been launched'
  fi
else
  echo "Tornado elasticsearch is already running"
fi

echo 'Launching Kibana..'
if [ "$(ps -eaf | grep tornado_data | grep kibana | wc -l | grep '1')" == "" ];then
  nohup ./tornado_data/*kibana*/bin/kibana > /tmp/kibana_tornado.log 2>&1 &
  if [ "$(ps -eaf | grep tornado_data | grep kibana | wc -l | grep '1')" == "" ];then
    echo 'Something went wrong launching kibana'
  else
    echo 'Kibana has successfully been launched'
  fi
else
  echo "Tornado kibana is already running"
fi

echo 'Launching Tornado server'
nohup rails s > /tmp/tornado.log 2>&1 &
