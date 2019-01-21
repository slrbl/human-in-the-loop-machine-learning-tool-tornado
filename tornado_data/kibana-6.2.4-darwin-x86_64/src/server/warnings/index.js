'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kbnServer, server) {
  process.on('warning', warning => {
    server.log(['warning', 'process'], warning);
  });
};

module.exports = exports['default'];
