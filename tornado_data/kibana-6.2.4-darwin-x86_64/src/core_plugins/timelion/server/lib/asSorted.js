'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = asSorted;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _unzipPairs = require('./unzipPairs.js');

var _unzipPairs2 = _interopRequireDefault(_unzipPairs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asSorted(timeValObject, fn) {
  const data = (0, _unzipPairs2.default)(timeValObject);
  return _lodash2.default.zipObject(fn(data));
}
module.exports = exports['default'];
