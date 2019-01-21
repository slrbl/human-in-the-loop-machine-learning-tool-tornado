'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_fields = require('../lib/get_fields');

var _get_index_pattern_service = require('../lib/get_index_pattern_service');

exports.default = server => {

  server.route({
    config: {
      pre: [_get_index_pattern_service.getIndexPatternService]
    },
    path: '/api/metrics/fields',
    method: 'GET',
    handler: (req, reply) => {
      (0, _get_fields.getFields)(req).then(reply).catch(err => {
        if (err.isBoom && err.status === 401) return reply(err);
        reply([]);
      });
    }
  });
};

module.exports = exports['default'];
