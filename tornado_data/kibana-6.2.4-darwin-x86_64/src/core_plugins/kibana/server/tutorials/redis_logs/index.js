'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisLogsSpecProvider = redisLogsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function redisLogsSpecProvider() {
  return {
    id: 'redisLogs',
    name: 'Redis logs',
    category: _tutorial_category.TUTORIAL_CATEGORY.LOGGING,
    shortDescription: 'Collect and parse error and slow logs created by Redis.',
    longDescription: 'The `redis` Filebeat module parses error and slow logs created by Redis.' + ' For Redis to write error logs, make sure the `logfile` option, from the' + ' Redis configuration file, is set to `redis-server.log`.' + ' The slow logs are read directly from Redis via the `SLOWLOG` command.' + ' For Redis to record slow logs, make sure the `slowlog-log-slower-than`' + ' option is set.' + ' Note that the `slowlog` fileset is experimental.' + ' [Learn more]({config.docs.beats.filebeat}/filebeat-module-redis.html)' + ' about the `redis` module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: '7fea2930-478e-11e7-b1f0-cb29bac6bf8b',
        linkLabel: 'Redis logs dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-redis.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/redis_logs/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
