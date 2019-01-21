'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kbnServer, server, config) {
  const disabled = config.get('server.xsrf.disableProtection');
  const whitelist = config.get('server.xsrf.whitelist');
  const versionHeader = 'kbn-version';
  const xsrfHeader = 'kbn-xsrf';

  server.ext('onPostAuth', function (req, reply) {
    if (disabled) {
      return reply.continue();
    }

    if (whitelist.includes(req.path)) {
      return reply.continue();
    }

    const isSafeMethod = req.method === 'get' || req.method === 'head';
    const hasVersionHeader = versionHeader in req.headers;
    const hasXsrfHeader = xsrfHeader in req.headers;

    if (!isSafeMethod && !hasVersionHeader && !hasXsrfHeader) {
      return reply((0, _boom.badRequest)(`Request must contain a ${xsrfHeader} header.`));
    }

    return reply.continue();
  });
};

var _boom = require('boom');

module.exports = exports['default'];
