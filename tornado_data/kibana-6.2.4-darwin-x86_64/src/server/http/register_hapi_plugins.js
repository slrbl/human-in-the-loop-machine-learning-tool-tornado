'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let registerPlugins = (() => {
  var _ref = _asyncToGenerator(function* (server) {
    yield (0, _bluebird.fromNode)(function (cb) {
      server.register(plugins, cb);
    });
  });

  return function registerPlugins(_x) {
    return _ref.apply(this, arguments);
  };
})();

exports.default = function (kbnServer, server) {
  registerPlugins(server);
};

var _vision = require('vision');

var _vision2 = _interopRequireDefault(_vision);

var _inert = require('inert');

var _inert2 = _interopRequireDefault(_inert);

var _h2o = require('h2o2');

var _h2o2 = _interopRequireDefault(_h2o);

var _bluebird = require('bluebird');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const plugins = [_vision2.default, _inert2.default, _h2o2.default];

module.exports = exports['default'];
