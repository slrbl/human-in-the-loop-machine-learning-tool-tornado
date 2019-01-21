'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createCreateRoute = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const createCreateRoute = exports.createCreateRoute = prereqs => {
  return {
    path: '/api/saved_objects/{type}/{id?}',
    method: 'POST',
    config: {
      pre: [prereqs.getSavedObjectsClient],
      validate: {
        query: _joi2.default.object().keys({
          overwrite: _joi2.default.boolean().default(false)
        }).default(),
        params: _joi2.default.object().keys({
          type: _joi2.default.string().required(),
          id: _joi2.default.string()
        }).required(),
        payload: _joi2.default.object({
          attributes: _joi2.default.object().required()
        }).required()
      },
      handler(request, reply) {
        const savedObjectsClient = request.pre.savedObjectsClient;
        var _request$params = request.params;
        const type = _request$params.type,
              id = _request$params.id;
        const overwrite = request.query.overwrite;

        const options = { id, overwrite };

        reply(savedObjectsClient.create(type, request.payload.attributes, options));
      }
    }
  };
};
