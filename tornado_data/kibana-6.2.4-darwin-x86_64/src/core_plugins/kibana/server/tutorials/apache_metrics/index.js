'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apacheMetricsSpecProvider = apacheMetricsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function apacheMetricsSpecProvider() {
  return {
    id: 'apacheMetrics',
    name: 'Apache metrics',
    category: _tutorial_category.TUTORIAL_CATEGORY.METRICS,
    shortDescription: 'Fetches internal metrics from the Apache 2 HTTP server.',
    longDescription: 'The `apache` Metricbeat module fetches internal metrics from the Apache 2 HTTP server.' + ' [Learn more]({config.docs.beats.metricbeat}/metricbeat-module-apache.html)' + ' about the apache module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: 'Metricbeat-Apache-HTTPD-server-status',
        linkLabel: 'Apache metrics dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-apache.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/apache_metrics/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
