'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _base_optimizer = require('./base_optimizer');

var _base_optimizer2 = _interopRequireDefault(_base_optimizer);

var _bluebird = require('bluebird');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class FsOptimizer extends _base_optimizer2.default {
  init() {
    var _this = this;

    return _asyncToGenerator(function* () {
      yield _this.initCompiler();
    })();
  }

  run() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      if (!_this2.compiler) yield _this2.init();

      yield (0, _bluebird.fromNode)(function (cb) {
        _this2.compiler.run(function (err, stats) {
          if (err || !stats) return cb(err);

          if (stats.hasErrors() || stats.hasWarnings()) {
            return cb(_this2.failedStatsToError(stats));
          } else {
            cb(null, stats);
          }
        });
      });
    })();
  }
}
exports.default = FsOptimizer;
module.exports = exports['default'];
