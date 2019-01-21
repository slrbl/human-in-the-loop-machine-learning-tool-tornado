'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = unzipPairs;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function unzipPairs(timeValObject) {
  const paired = _lodash2.default.chain(timeValObject).pairs().map(function (point) {
    return [parseInt(point[0], 10), point[1]];
  }).sortBy(function (point) {
    return point[0];
  }).value();
  return paired;
}
module.exports = exports['default'];
