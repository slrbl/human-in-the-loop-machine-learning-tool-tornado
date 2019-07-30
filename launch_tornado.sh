# About: Tornado Launcher
# Version: V1.0
# Author: walid.daboubi@gmail.com

bundle install
rake db:migrate

echo 'Launching Elasticsearch..'
cd ./tornado_data/*elastic*/
mkdir plugins
mkdir logs
mkdir data
mkdir data/nodes
cd -
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

echo 'Launching Tornado server in production mode'
nohup rails s -e production > /tmp/tornado.log 2>&1 &
