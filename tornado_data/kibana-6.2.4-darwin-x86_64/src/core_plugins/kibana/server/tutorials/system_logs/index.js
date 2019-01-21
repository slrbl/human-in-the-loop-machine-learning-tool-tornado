'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.systemLogsSpecProvider = systemLogsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function systemLogsSpecProvider() {
  return {
    id: 'systemLogs',
    name: 'System logs',
    category: _tutorial_category.TUTORIAL_CATEGORY.LOGGING,
    shortDescription: 'Collect and parse logs written by the local Syslog server.',
    longDescription: 'The `system` Filebeat module collects and parses logs created by the system logging service of common ' + ' Unix/Linux based distributions. This module is not available on Windows.' + ' [Learn more]({config.docs.beats.filebeat}/filebeat-module-system.html)' + ' about the `system` module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: 'Filebeat-syslog-dashboard',
        linkLabel: 'System logs dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-system.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/system_logs/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
