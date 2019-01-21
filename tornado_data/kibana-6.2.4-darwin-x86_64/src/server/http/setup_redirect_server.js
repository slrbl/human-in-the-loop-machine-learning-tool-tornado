'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _url = require('url');

var _bluebird = require('bluebird');

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// If a redirect port is specified, we start an http server at this port and
// redirect all requests to the ssl port.
exports.default = (() => {
  var _ref = _asyncToGenerator(function* (kbnServer, server, config) {
    const isSslEnabled = config.get('server.ssl.enabled');
    const portToRedirectFrom = config.get('server.ssl.redirectHttpFromPort');

    // Both ssl and port to redirect from must be specified
    if (!isSslEnabled || portToRedirectFrom === undefined) {
      return;
    }

    const host = config.get('server.host');
    const sslPort = config.get('server.port');

    if (portToRedirectFrom === sslPort) {
      throw new Error('Kibana does not accept http traffic to `server.port` when ssl is ' + 'enabled (only https is allowed), so `server.ssl.redirectHttpFromPort` ' + `cannot be configured to the same value. Both are [${sslPort}].`);
    }

    const redirectServer = new _hapi2.default.Server();

    redirectServer.connection({
      host,
      port: portToRedirectFrom
    });

    redirectServer.ext('onRequest', function (req, reply) {
      reply.redirect((0, _url.format)({
        protocol: 'https',
        hostname: host,
        port: sslPort,
        pathname: req.url.pathname,
        search: req.url.search
      }));
    });

    try {
      yield (0, _bluebird.fromNode)(function (cb) {
        return redirectServer.start(cb);
      });
    } catch (err) {
      if (err.code === 'EADDRINUSE') {
        throw new Error('The redirect server failed to start up because port ' + `${portToRedirectFrom} is already in use. Ensure the port specified ` + 'in `server.ssl.redirectHttpFromPort` is available.');
      } else {
        throw err;
      }
    }
  });

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = exports['default'];
