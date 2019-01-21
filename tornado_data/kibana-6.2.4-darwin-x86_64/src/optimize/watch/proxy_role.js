'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _lodash = require('lodash');

exports.default = (kbnServer, server, config) => {

  server.route({
    path: '/bundles/{path*}',
    method: 'GET',
    handler: {
      proxy: {
        host: config.get('optimize.watchHost'),
        port: config.get('optimize.watchPort'),
        passThrough: true,
        xforward: true
      }
    },
    config: { auth: false }
  });

  return (0, _bluebird.fromNode)(cb => {
    const timeout = setTimeout(() => {
      cb(new Error('Timeout waiting for the optimizer to become ready'));
    }, config.get('optimize.watchProxyTimeout'));

    const waiting = (0, _lodash.once)(() => {
      server.log(['info', 'optimize'], 'Waiting for optimizer to be ready');
    });

    if (!process.connected) return;

    process.send(['WORKER_BROADCAST', { optimizeReady: '?' }]);
    process.on('message', msg => {
      switch ((0, _lodash.get)(msg, 'optimizeReady')) {
        case true:
          clearTimeout(timeout);
          cb();
          break;
        case false:
          waiting();
          break;
      }
    });
  });
};

module.exports = exports['default'];
