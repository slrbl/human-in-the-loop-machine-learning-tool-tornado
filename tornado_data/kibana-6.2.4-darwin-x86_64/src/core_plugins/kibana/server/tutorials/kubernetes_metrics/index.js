'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.kubernetesMetricsSpecProvider = kubernetesMetricsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function kubernetesMetricsSpecProvider() {
  return {
    id: 'kubernetesMetrics',
    name: 'Kubernetes metrics',
    category: _tutorial_category.TUTORIAL_CATEGORY.METRICS,
    shortDescription: 'Fetches metrics from your Kubernetes installation.',
    longDescription: 'The `kubernetes` Metricbeat module fetches metrics from the Kubernetes APIs.' + ' [Learn more]({config.docs.beats.metricbeat}/metricbeat-module-kubernetes.html)' + ' about the kubernetes module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: 'AV4RGUqo5NkDleZmzKuZ',
        linkLabel: 'Kubernetes metrics dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-kubernetes.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/kubernetes_metrics/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
