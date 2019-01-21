'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isBasicAgg = isBasicAgg;
exports.createOptions = createOptions;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lookup = {
  'count': 'Count',
  'calculation': 'Calculation',
  'std_deviation': 'Std. Deviation',
  'variance': 'Variance',
  'sum_of_squares': 'Sum of Sq.',
  'avg': 'Average',
  'max': 'Max',
  'min': 'Min',
  'sum': 'Sum',
  'percentile': 'Percentile',
  'percentile_rank': 'Percentile Rank',
  'cardinality': 'Cardinality',
  'value_count': 'Value Count',
  'derivative': 'Derivative',
  'cumulative_sum': 'Cumulative Sum',
  'moving_average': 'Moving Average',
  'avg_bucket': 'Overall Average',
  'min_bucket': 'Overall Min',
  'max_bucket': 'Overall Max',
  'sum_bucket': 'Overall Sum',
  'variance_bucket': 'Overall Variance',
  'sum_of_squares_bucket': 'Overall Sum of Sq.',
  'std_deviation_bucket': 'Overall Std. Deviation',
  'series_agg': 'Series Agg',
  'serial_diff': 'Serial Difference',
  'filter_ratio': 'Filter Ratio',
  'positive_only': 'Positive Only',
  'static': 'Static Value'
};

const pipeline = ['calculation', 'derivative', 'cumulative_sum', 'moving_average', 'avg_bucket', 'min_bucket', 'max_bucket', 'sum_bucket', 'variance_bucket', 'sum_of_squares_bucket', 'std_deviation_bucket', 'series_agg', 'serial_diff', 'positive_only'];

const byType = {
  _all: lookup,
  pipeline: pipeline,
  basic: _lodash2.default.omit(lookup, pipeline),
  metrics: _lodash2.default.pick(lookup, ['count', 'avg', 'min', 'max', 'sum', 'cardinality', 'value_count'])
};

function isBasicAgg(item) {
  return _lodash2.default.includes(Object.keys(byType.basic), item.type);
}

function createOptions(type = '_all', siblings = []) {
  let aggs = byType[type];
  if (!aggs) aggs = byType._all;
  let enablePipelines = siblings.some(isBasicAgg);
  if (siblings.length <= 1) enablePipelines = false;
  return (0, _lodash2.default)(aggs).map((label, value) => {
    const disabled = _lodash2.default.includes(pipeline, value) ? !enablePipelines : false;
    return {
      label: disabled ? `${label} (use the "+" button to add this pipeline agg)` : label,
      value,
      disabled
    };
  }).value();
}

exports.default = lookup;
