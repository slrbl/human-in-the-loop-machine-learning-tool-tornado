'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFieldsForWildcardRoute = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createFieldsForWildcardRoute = exports.createFieldsForWildcardRoute = pre => ({
  path: '/api/index_patterns/_fields_for_wildcard',
  method: 'GET',
  config: {
    pre: [pre.getIndexPatternsService],
    validate: {
      query: _joi2.default.object().keys({
        pattern: _joi2.default.string().required(),
        meta_fields: _joi2.default.array().items(_joi2.default.string()).default([])
      }).default()
    },
    handler(req, reply) {
      const indexPatterns = req.pre.indexPatterns;
      var _req$query = req.query;
      const pattern = _req$query.pattern,
            metaFields = _req$query.meta_fields;


      reply(indexPatterns.getFieldsForWildcard({
        pattern,
        metaFields
      }).then(fields => ({ fields })));
    }
  }
});
