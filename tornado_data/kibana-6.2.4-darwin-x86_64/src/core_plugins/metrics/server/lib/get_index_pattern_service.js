'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIndexPatternService = undefined;

var _service = require('../../../../server/index_patterns/service');

const getIndexPatternService = exports.getIndexPatternService = {
  assign: 'indexPatternsService',
  method(req, reply) {
    const dataCluster = req.server.plugins.elasticsearch.getCluster('data');
    const callDataCluster = (...args) => {
      return dataCluster.callWithRequest(req, ...args);
    };
    reply(new _service.IndexPatternsService(callDataCluster));
  }
};
