'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kbnServer, server, config) {
  kbnServer.status = new _server_status2.default(kbnServer.server);

  if (server.plugins['even-better']) {
    const metrics = new _metrics.Metrics(config, server);

    server.plugins['even-better'].monitor.on('ops', event => {
      metrics.capture(event).then(data => {
        kbnServer.metrics = data;
      });
    });
  }

  const wrapAuth = (0, _wrap_auth_config2.default)(config.get('status.allowAnonymous'));
  const matchSnapshot = /-SNAPSHOT$/;
  server.route(wrapAuth({
    method: 'GET',
    path: '/api/status',
    config: {
      tags: ['api']
    },
    handler: function handler(request, reply) {
      const status = {
        name: config.get('server.name'),
        uuid: config.get('server.uuid'),
        version: {
          number: config.get('pkg.version').replace(matchSnapshot, ''),
          build_hash: config.get('pkg.buildSha'),
          build_number: config.get('pkg.buildNum'),
          build_snapshot: matchSnapshot.test(config.get('pkg.version'))
        },
        status: kbnServer.status.toJSON(),
        metrics: kbnServer.metrics
      };

      return reply(status);
    }
  }));

  server.decorate('reply', 'renderStatusPage', _asyncToGenerator(function* () {
    const app = server.getHiddenUiAppById('status_page');
    const reply = this;
    const response = app ? yield reply.renderApp(app) : reply(kbnServer.status.toString());

    if (response) {
      response.code(kbnServer.status.isGreen() ? 200 : 503);
      return response;
    }
  }));

  server.route(wrapAuth({
    method: 'GET',
    path: '/status',
    handler(request, reply) {
      reply.renderStatusPage();
    }
  }));
};

var _server_status = require('./server_status');

var _server_status2 = _interopRequireDefault(_server_status);

var _wrap_auth_config = require('./wrap_auth_config');

var _wrap_auth_config2 = _interopRequireDefault(_wrap_auth_config);

var _metrics = require('./metrics');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

module.exports = exports['default'];
