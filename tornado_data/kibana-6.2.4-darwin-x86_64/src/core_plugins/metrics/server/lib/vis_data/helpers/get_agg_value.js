'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _extended_stats_types = require('./extended_stats_types');

var _extended_stats_types2 = _interopRequireDefault(_extended_stats_types);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (row, metric) => {
  // Extended Stats
  if (_lodash2.default.includes(_extended_stats_types2.default, metric.type)) {
    const isStdDeviation = /^std_deviation/.test(metric.type);
    const modeIsBounds = ~['upper', 'lower'].indexOf(metric.mode);
    if (isStdDeviation && modeIsBounds) {
      return _lodash2.default.get(row, `${metric.id}.std_deviation_bounds.${metric.mode}`);
    }
    return _lodash2.default.get(row, `${metric.id}.${metric.type}`);
  }

  // Percentiles
  if (metric.type === 'percentile') {
    let percentileKey = `${metric.percent}`;
    if (!/\./.test(`${metric.percent}`)) {
      percentileKey = `${metric.percent}.0`;
    }
    return row[metric.id].values[percentileKey];
  }

  if (metric.type === 'percentile_rank') {
    const percentileRankKey = `${metric.value}`;
    return row[metric.id] && row[metric.id].values && row[metric.id].values[percentileRankKey];
  }

  // Derivatives
  const normalizedValue = _lodash2.default.get(row, `${metric.id}.normalized_value`, null);

  // Everything else
  const value = _lodash2.default.get(row, `${metric.id}.value`, null);
  return normalizedValue || value;
};

module.exports = exports['default'];
