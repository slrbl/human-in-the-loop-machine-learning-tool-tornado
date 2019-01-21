'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = stdSibling;

var _get_splits = require('../../helpers/get_splits');

var _get_splits2 = _interopRequireDefault(_get_splits);

var _get_last_metric = require('../../helpers/get_last_metric');

var _get_last_metric2 = _interopRequireDefault(_get_last_metric);

var _get_sibling_agg_value = require('../../helpers/get_sibling_agg_value');

var _get_sibling_agg_value2 = _interopRequireDefault(_get_sibling_agg_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stdSibling(bucket, panel, series) {
  return next => results => {
    const metric = (0, _get_last_metric2.default)(series);

    if (!/_bucket$/.test(metric.type)) return next(results);
    if (metric.type === 'std_deviation_bucket' && metric.mode === 'band') return next(results);

    const fakeResp = { aggregations: bucket };
    (0, _get_splits2.default)(fakeResp, panel, series).forEach(split => {
      const data = split.timeseries.buckets.map(b => {
        return [b.key, (0, _get_sibling_agg_value2.default)(split, metric)];
      });
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
