'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dockerMetricsSpecProvider = dockerMetricsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function dockerMetricsSpecProvider() {
  return {
    id: 'dockerMetrics',
    name: 'Docker metrics',
    category: _tutorial_category.TUTORIAL_CATEGORY.METRICS,
    shortDescription: 'Fetches metrics about your Docker containers.',
    longDescription: 'The `docker` Metricbeat module fetches metrics from the Docker server.' + ' [Learn more]({config.docs.beats.metricbeat}/metricbeat-module-docker.html)' + ' about the docker module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: 'AV4REOpp5NkDleZmzKkE',
        linkLabel: 'Docker metrics dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.metricbeat}/exported-fields-docker.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/docker_metrics/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
