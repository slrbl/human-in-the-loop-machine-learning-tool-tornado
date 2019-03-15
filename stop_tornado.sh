# About: Tornado Stopper
# Version: V1.0
# Author: walid.daboubi@gmail.com

es_pid="$(ps -eaf | grep -v "grep" |grep "elasticsearch" | grep "tornado_data/elasticsearch" | awk '{print $2}')"
kibana_pid="$(ps -eaf | grep -v "grep" | grep "kibana" | grep "tornado_data/kibana" | awk '{print $2}')"
puma_pid="$(ps -eaf | grep "puma" | grep "0.0.0.0"| grep "3000" | awk '{print $2}')"

if [ "$es_pid" != "" ]; then
  echo "Elasticsearch is running as $es_pid"
  kill -9 $es_pid
  if [ "$?" == "0" ]; then
    echo "Elasticsearch has successfully been stopped"
  else
    echo "Something went wrong stopping Elasticsearch"
  fi
else
  echo "No Elasticsearch is running for Tornado"
fi

if [ "$kibana_pid" != "" ]; then
  echo "Kibana is running as $kibana_pid"
  kill -9 $kibana_pid
  if [ "$?" == "0" ]; then
    echo "Kibana has successfully been stopped"
  else
    echo "Something went wrong stopping Kibana"
  fi
else
  echo "No Kibana is running for Tornado"
fi

if [ "$puma_pid" != "" ]; then
  echo "Rails server is running as $puma_pid"
  kill -9 $puma_pid
  if [ "$?" == "0" ]; then
    echo "Kibana has successfully been stopped"
  else
    echo "Something went wrong stopping Kibana"
  fi
else
  echo "No Rails is running for Tornado"
fi
