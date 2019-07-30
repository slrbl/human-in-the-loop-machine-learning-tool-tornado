# About: Tornado Launcher
# Version: V1.1 - 2019/07/21
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

echo 'Launching Redis'
nohup redis-server > /tmp/tornado_redis.log 2>&1 &

echo 'Launching Sidekiq'
nohup bundle exec sidekiq > /tmp/tornado_sidekiq.log 2>&1 &

echo 'Launching Tornado Puma server'
nohup rails s > /tmp/tornado.log 2>&1 &

sleep 10

es_pid="$(ps -eaf | grep -v "grep" |grep "elasticsearch" | grep "tornado_data/elasticsearch" | awk '{print $2}')"
kibana_pid="$(ps -eaf | grep -v "grep" | grep "kibana" | grep "tornado_data/kibana" | awk '{print $2}')"
puma_pid="$(ps -eaf | grep "puma" | grep -v "grep" | awk '{print $2}')"
redis_pid="$(ps -eaf | grep "redis" | grep -v "grep" | awk '{print $2}')"
sidekiq_pid="$(ps -eaf | grep "sidekiq" | grep -v "grep" | awk '{print $2}')"

echo "Elasticseach PID: "$es_pid
echo "Kibana PID: "$kibana_pid
echo "Puma PID: "$puma_pid
echo "Redis PID: "$redis_pid
echo "Sidekiq PID: "$sidekiq_pid
