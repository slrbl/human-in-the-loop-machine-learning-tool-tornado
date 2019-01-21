'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.nginxLogsSpecProvider = nginxLogsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function nginxLogsSpecProvider() {
  return {
    id: 'nginxLogs',
    name: 'Nginx logs',
    category: _tutorial_category.TUTORIAL_CATEGORY.LOGGING,
    shortDescription: 'Collect and parse access and error logs created by the Nginx HTTP server.',
    longDescription: 'The `nginx` Filebeat module parses access and error logs created by the Nginx HTTP server.' + ' [Learn more]({config.docs.beats.filebeat}/filebeat-module-nginx.html)' + ' about the nginx module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: '55a9e6e0-a29e-11e7-928f-5dbe6f6f5519',
        linkLabel: 'Nginx logs dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-nginx.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/nginx_logs/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
