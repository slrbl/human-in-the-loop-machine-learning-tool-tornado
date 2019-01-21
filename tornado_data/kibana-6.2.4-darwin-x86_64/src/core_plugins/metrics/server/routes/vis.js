'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _get_vis_data = require('../lib/get_vis_data');

var _get_vis_data2 = _interopRequireDefault(_get_vis_data);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = server => {

  server.route({
    path: '/api/metrics/vis/data',
    method: 'POST',
    handler: (req, reply) => {
      (0, _get_vis_data2.default)(req).then(reply).catch(err => {
        if (err.isBoom && err.status === 401) return reply(err);
        reply(_boom2.default.boomify(err, { statusCode: 500 }));
      });
    }
  });
};

module.exports = exports['default'];
