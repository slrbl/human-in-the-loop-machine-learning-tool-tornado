'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.createDataCluster = createDataCluster;

var _client_logger = require('./client_logger');

function createDataCluster(server) {
  const config = server.config();
  const ElasticsearchClientLogging = (0, _client_logger.clientLogger)(server);

  class DataClientLogging extends ElasticsearchClientLogging {
    constructor(...args) {
      var _temp;

      return _temp = super(...args), this.tags = ['data'], this.logQueries = getConfig().logQueries, _temp;
    }

  }

  function getConfig() {
    if (Boolean(config.get('elasticsearch.tribe.url'))) {
      return config.get('elasticsearch.tribe');
    }

    return config.get('elasticsearch');
  }

  server.plugins.elasticsearch.createCluster('data', _extends({
    log: DataClientLogging
  }, getConfig()));
}
