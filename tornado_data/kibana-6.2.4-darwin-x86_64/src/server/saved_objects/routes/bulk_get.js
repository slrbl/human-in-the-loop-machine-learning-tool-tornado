'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBulkGetRoute = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createBulkGetRoute = exports.createBulkGetRoute = prereqs => ({
  path: '/api/saved_objects/bulk_get',
  method: 'POST',
  config: {
    pre: [prereqs.getSavedObjectsClient],
    validate: {
      payload: _joi2.default.array().items(_joi2.default.object({
        type: _joi2.default.string().required(),
        id: _joi2.default.string().required()
      }).required())
    },
    handler(request, reply) {
      const savedObjectsClient = request.pre.savedObjectsClient;


      reply(savedObjectsClient.bulkGet(request.payload));
    }
  }
});
