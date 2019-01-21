'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.importApi = importApi;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _import_dashboards = require('../../../lib/import/import_dashboards');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function importApi(server) {
  server.route({
    path: '/api/kibana/dashboards/import',
    method: ['POST'],
    config: {
      validate: {
        payload: _joi2.default.object().keys({
          objects: _joi2.default.array(),
          version: _joi2.default.string()
        }),
        query: _joi2.default.object().keys({
          force: _joi2.default.boolean().default(false),
          exclude: [_joi2.default.string(), _joi2.default.array().items(_joi2.default.string())]
        })
      },
      tags: ['api']
    },

    handler: (req, reply) => {
      return (0, _import_dashboards.importDashboards)(req).then(resp => reply(resp)).catch(err => reply(_boom2.default.boomify(err, { statusCode: 400 })));
    }
  });
}
