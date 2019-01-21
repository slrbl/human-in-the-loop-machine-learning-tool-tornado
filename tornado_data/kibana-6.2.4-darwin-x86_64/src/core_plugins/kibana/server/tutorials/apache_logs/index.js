'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.apacheLogsSpecProvider = apacheLogsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function apacheLogsSpecProvider() {
  return {
    id: 'apacheLogs',
    name: 'Apache logs',
    category: _tutorial_category.TUTORIAL_CATEGORY.LOGGING,
    shortDescription: 'Collect and parse access and error logs created by the Apache HTTP server.',
    longDescription: 'The apache2 Filebeat module parses access and error logs created by the Apache 2 HTTP server.' + ' [Learn more]({config.docs.beats.filebeat}/filebeat-module-apache2.html)' + ' about the apache2 module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: 'Filebeat-Apache2-Dashboard',
        linkLabel: 'Apache2 logs dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-apache2.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/apache_logs/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
