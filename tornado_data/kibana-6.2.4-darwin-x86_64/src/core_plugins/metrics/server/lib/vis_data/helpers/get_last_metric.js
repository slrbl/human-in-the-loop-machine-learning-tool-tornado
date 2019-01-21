'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getLastMetric;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getLastMetric(series) {
  return _lodash2.default.last(series.metrics.filter(s => s.type !== 'series_agg'));
}
module.exports = exports['default'];
