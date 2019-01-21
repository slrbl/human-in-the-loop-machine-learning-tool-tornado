'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemMetricsSpecProvider = systemMetricsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function systemMetricsSpecProvider() {
  return {
    id: 'systemMetrics',
    name: 'System metrics',
    category: _tutorial_category.TUTORIAL_CATEGORY.METRICS,
    shortDescription: 'Collects CPU, memory, network, and disk statistics from the host.',
    longDescription: 'The `system` Metricbeat module collects CPU, memory, network, and disk statistics from the host.' + ' It collects system wide statistics as well as per process and per filesystem statistics.' + ' [Learn more]({config.docs.beats.metricbeat}/metricbeat-module-system.html)' + ' about the system module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: 'Metricbeat-system-overview',
        linkLabel: 'System metrics dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-system.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/system_metrics/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
