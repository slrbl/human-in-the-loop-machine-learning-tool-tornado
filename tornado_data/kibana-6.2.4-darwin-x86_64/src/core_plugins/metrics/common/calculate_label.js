'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateLabel;

var _lodash = require('lodash');

var _agg_lookup = require('./agg_lookup');

var _agg_lookup2 = _interopRequireDefault(_agg_lookup);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const paths = ['cumulative_sum', 'derivative', 'moving_average', 'avg_bucket', 'sum_bucket', 'min_bucket', 'max_bucket', 'std_deviation_bucket', 'variance_bucket', 'sum_of_squares_bucket', 'serial_diff', 'positive_only'];
function calculateLabel(metric, metrics) {
  if (!metric) return 'Unknown';
  if (metric.alias) return metric.alias;

  if (metric.type === 'count') return 'Count';
  if (metric.type === 'calculation') return 'Calculation';
  if (metric.type === 'series_agg') return `Series Agg (${metric.function})`;
  if (metric.type === 'filter_ratio') return 'Filter Ratio';
  if (metric.type === 'static') return `Static Value of ${metric.value}`;

  if (metric.type === 'percentile_rank') {
    return `${_agg_lookup2.default[metric.type]} (${metric.value}) of ${metric.field}`;
  }

  if ((0, _lodash.includes)(paths, metric.type)) {
    let additionalLabel = '';
    const targetMetric = metrics.find(m => (0, _lodash.startsWith)(metric.field, m.id));
    const targetLabel = calculateLabel(targetMetric, metrics);
    // For percentiles we need to parse the field id to extract the percentile
    // the user configured in the percentile aggregation and specified in the
    // submetric they selected. This applies only to pipeline aggs.
    if (targetMetric && targetMetric.type === 'percentile') {
      const percentileValueMatch = /\[([0-9\.]+)\]$/;
      const matches = metric.field.match(percentileValueMatch);
      if (matches) {
        additionalLabel += ` (${matches[1]})`;
      }
    }
    return `${_agg_lookup2.default[metric.type]} of ${targetLabel}${additionalLabel}`;
  }

  return `${_agg_lookup2.default[metric.type]} of ${metric.field}`;
}
module.exports = exports['default'];
