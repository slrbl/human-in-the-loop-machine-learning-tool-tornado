'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createAdminCluster = createAdminCluster;

var _client_logger = require('./client_logger');

function createAdminCluster(server) {
  const config = server.config();
  const ElasticsearchClientLogging = (0, _client_logger.clientLogger)(server);

  class AdminClientLogging extends ElasticsearchClientLogging {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), this.tags = ['admin'], this.logQueries = config.get('elasticsearch.logQueries'), _temp;
    }

  }

  server.plugins.elasticsearch.createCluster('admin', _extends({
    log: AdminClientLogging
  }, config.get('elasticsearch')));
}
