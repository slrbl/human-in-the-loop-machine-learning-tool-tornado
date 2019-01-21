'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.redisMetricsSpecProvider = redisMetricsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function redisMetricsSpecProvider() {
  return {
    id: 'redisMetrics',
    name: 'Redis metrics',
    category: _tutorial_category.TUTORIAL_CATEGORY.METRICS,
    shortDescription: 'Fetches internal metrics from Redis.',
    longDescription: 'The `redis` Metricbeat module fetches internal metrics from the Redis server.' + ' [Learn more]({config.docs.beats.metricbeat}/metricbeat-module-redis.html)' + ' about the redis module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: 'AV4YjZ5pux-M-tCAunxK',
        linkLabel: 'Redis metrics dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-redis.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/redis_metrics/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
