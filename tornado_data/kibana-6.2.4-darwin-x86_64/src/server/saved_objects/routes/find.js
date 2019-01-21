'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFindRoute = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _case_conversion = require('../../../utils/case_conversion');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createFindRoute = exports.createFindRoute = prereqs => ({
  path: '/api/saved_objects/{type?}',
  method: 'GET',
  config: {
    pre: [prereqs.getSavedObjectsClient],
    validate: {
      params: _joi2.default.object().keys({
        type: _joi2.default.string()
      }).default(),
      query: _joi2.default.object().keys({
        per_page: _joi2.default.number().min(0).default(20),
        page: _joi2.default.number().min(0).default(1),
        type: _joi2.default.string(),
        search: _joi2.default.string().allow('').optional(),
        search_fields: _joi2.default.array().items(_joi2.default.string()).single(),
        fields: _joi2.default.array().items(_joi2.default.string()).single()
      }).default()
    },
    handler(request, reply) {
      const options = (0, _case_conversion.keysToCamelCaseShallow)(request.query);

      if (request.params.type) {
        options.type = request.params.type;
      }

      reply(request.pre.savedObjectsClient.find(options));
    }
  }
});
