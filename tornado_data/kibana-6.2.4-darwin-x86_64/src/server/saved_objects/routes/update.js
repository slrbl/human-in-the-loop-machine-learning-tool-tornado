'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createUpdateRoute = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createUpdateRoute = exports.createUpdateRoute = prereqs => {
  return {
    path: '/api/saved_objects/{type}/{id}',
    method: 'PUT',
    config: {
      pre: [prereqs.getSavedObjectsClient],
      validate: {
        params: _joi2.default.object().keys({
          type: _joi2.default.string().required(),
          id: _joi2.default.string().required()
        }).required(),
        payload: _joi2.default.object({
          attributes: _joi2.default.object().required(),
          version: _joi2.default.number().min(1)
        }).required()
      },
      handler(request, reply) {
        const savedObjectsClient = request.pre.savedObjectsClient;
        var _request$params = request.params;
        const type = _request$params.type,
              id = _request$params.id;
        var _request$payload = request.payload;
        const attributes = _request$payload.attributes,
              version = _request$payload.version;

        const options = { version };

        reply(savedObjectsClient.update(type, id, attributes, options));
      }
    }
  };
};
