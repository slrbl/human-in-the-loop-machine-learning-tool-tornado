'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.registerTutorials = registerTutorials;

var _system_logs = require('./system_logs');

var _system_metrics = require('./system_metrics');

var _apache_logs = require('./apache_logs');

var _apache_metrics = require('./apache_metrics');

var _nginx_logs = require('./nginx_logs');

var _nginx_metrics = require('./nginx_metrics');

var _mysql_logs = require('./mysql_logs');

var _mysql_metrics = require('./mysql_metrics');

var _redis_logs = require('./redis_logs');

var _redis_metrics = require('./redis_metrics');

var _docker_metrics = require('./docker_metrics');

var _kubernetes_metrics = require('./kubernetes_metrics');

var _netflow = require('./netflow');

var _apm = require('./apm');

function registerTutorials(server) {
  server.registerTutorial(_system_logs.systemLogsSpecProvider);
  server.registerTutorial(_system_metrics.systemMetricsSpecProvider);
  server.registerTutorial(_apache_logs.apacheLogsSpecProvider);
  server.registerTutorial(_apache_metrics.apacheMetricsSpecProvider);
  server.registerTutorial(_nginx_logs.nginxLogsSpecProvider);
  server.registerTutorial(_nginx_metrics.nginxMetricsSpecProvider);
  server.registerTutorial(_mysql_logs.mysqlLogsSpecProvider);
  server.registerTutorial(_mysql_metrics.mysqlMetricsSpecProvider);
  server.registerTutorial(_redis_logs.redisLogsSpecProvider);
  server.registerTutorial(_redis_metrics.redisMetricsSpecProvider);
  server.registerTutorial(_docker_metrics.dockerMetricsSpecProvider);
  server.registerTutorial(_kubernetes_metrics.kubernetesMetricsSpecProvider);
  server.registerTutorial(_netflow.netflowSpecProvider);
  server.registerTutorial(_apm.apmSpecProvider);
}
