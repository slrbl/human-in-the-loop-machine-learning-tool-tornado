'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = argType;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function argType(arg) {
  if (Array.isArray(arg)) {
    return _lodash2.default.chain(arg).map(argType).flattenDeep().value();
  }

  if (_lodash2.default.isObject(arg) && arg) {
    return arg.type;
  }
  if (arg == null) {
    return 'null';
  }
  return typeof arg;
}
module.exports = exports['default'];
