'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mysqlLogsSpecProvider = mysqlLogsSpecProvider;

var _tutorial_category = require('../../../common/tutorials/tutorial_category');

var _on_prem = require('./on_prem');

var _elastic_cloud = require('./elastic_cloud');

var _on_prem_elastic_cloud = require('./on_prem_elastic_cloud');

function mysqlLogsSpecProvider() {
  return {
    id: 'mysqlLogs',
    name: 'MySQL logs',
    category: _tutorial_category.TUTORIAL_CATEGORY.LOGGING,
    shortDescription: 'Collect and parse error and slow logs created by MySQL.',
    longDescription: 'The `mysql` Filebeat module parses error and slow logs created by MySQL.' + ' [Learn more]({config.docs.beats.filebeat}/filebeat-module-mysql.html)' + ' about the `mysql` module.',
    //iconPath: '', TODO
    artifacts: {
      dashboards: [{
        id: 'Filebeat-MySQL-Dashboard',
        linkLabel: 'MySQL logs dashboard',
        isOverview: true
      }],
      exportedFields: {
        documentationUrl: '{config.docs.beats.filebeat}/exported-fields-mysql.html'
      }
    },
    completionTimeMinutes: 10,
    previewImagePath: '/plugins/kibana/home/tutorial_resources/mysql_logs/screenshot.png',
    onPrem: _on_prem.ON_PREM_INSTRUCTIONS,
    elasticCloud: _elastic_cloud.ELASTIC_CLOUD_INSTRUCTIONS,
    onPremElasticCloud: _on_prem_elastic_cloud.ON_PREM_ELASTIC_CLOUD_INSTRUCTIONS
  };
}
