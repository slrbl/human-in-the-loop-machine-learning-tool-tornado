'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.exportApi = exportApi;

var _export_dashboards = require('../../../lib/export/export_dashboards');

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function exportApi(server) {
  server.route({
    path: '/api/kibana/dashboards/export',
    config: {
      validate: {
        query: _joi2.default.object().keys({
          dashboard: _joi2.default.alternatives().try(_joi2.default.string(), _joi2.default.array().items(_joi2.default.string())).required()
        })
      },
      tags: ['api']
    },
    method: ['GET'],
    handler: (req, reply) => {
      const currentDate = _moment2.default.utc();
      return (0, _export_dashboards.exportDashboards)(req).then(resp => {
        const json = JSON.stringify(resp, null, '  ');
        const filename = `kibana-dashboards.${currentDate.format('YYYY-MM-DD-HH-mm-ss')}.json`;
        reply(json).header('Content-Disposition', `attachment; filename="${filename}"`).header('Content-Type', 'application/json').header('Content-Length', json.length);
      }).catch(err => reply(_boom2.default.boomify(err, { statusCode: 400 })));
    }
  });
}
