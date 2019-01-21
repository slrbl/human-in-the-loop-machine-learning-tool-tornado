'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mysqlMetricsSpecProvider = mysqlMetricsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function mysqlMetricsSpecProvider() {
  return {
    id: 'mysqlMetrics',
    name: 'MySQL metrics',
    category: _tutorial_category.TUTORIAL_CATEGORY.METRICS,
    shortDescription: 'Fetches internal metrics from MySQL.',
    longDescription: 'The `mysql` Metricbeat module fetches internal metrics from the MySQL server.' + ' [Learn more]({config.docs.beats.metricbeat}/metricbeat-module-mysql.html)' + ' about the mysql module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: '66881e90-0006-11e7-bf7f-c9acc3d3e306',
        linkLabel: 'MySQL metrics dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-mysql.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/mysql_metrics/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
