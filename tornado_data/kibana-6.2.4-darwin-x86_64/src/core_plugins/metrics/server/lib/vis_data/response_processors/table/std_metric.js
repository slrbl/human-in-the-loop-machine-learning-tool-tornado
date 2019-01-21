'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stdMetric;

var _get_splits = require('../../helpers/get_splits');

var _get_splits2 = _interopRequireDefault(_get_splits);

var _get_last_metric = require('../../helpers/get_last_metric');

var _get_last_metric2 = _interopRequireDefault(_get_last_metric);

var _map_bucket = require('../../helpers/map_bucket');

var _map_bucket2 = _interopRequireDefault(_map_bucket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stdMetric(bucket, panel, series) {
  return next => results => {
    const metric = (0, _get_last_metric2.default)(series);
    if (metric.type === 'std_deviation' && metric.mode === 'band') {
      return next(results);
    }
    if (metric.type === 'percentile') {
      return next(results);
    }
    if (/_bucket$/.test(metric.type)) return next(results);

    const fakeResp = { aggregations: bucket };
    (0, _get_splits2.default)(fakeResp, panel, series).forEach(split => {
      const data = split.timeseries.buckets.map((0, _map_bucket2.default)(metric));
      results.push({
        id: split.id,
        label: split.label,
        data
      });
    });

    return next(results);
  };
}
module.exports = exports['default'];
