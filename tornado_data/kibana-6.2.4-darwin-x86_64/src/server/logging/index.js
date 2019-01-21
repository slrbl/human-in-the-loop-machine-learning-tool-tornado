'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kbnServer, server, config) {
  // prevent relying on kbnServer so this can be used with other hapi servers
  kbnServer = null;

  return (0, _bluebird.fromNode)(function (cb) {
    server.register({
      register: _evenBetter2.default,
      options: (0, _configuration2.default)(config)
    }, cb);
  });
};

var _bluebird = require('bluebird');

var _evenBetter = require('even-better');

var _evenBetter2 = _interopRequireDefault(_evenBetter);

var _configuration = require('./configuration');

var _configuration2 = _interopRequireDefault(_configuration);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
