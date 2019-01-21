'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

const percentileTest = /\[[0-9\.]+\]$/;
const percentileNumberTest = /\d+\.\d+/;

exports.default = (id, metrics) => {
  const metric = metrics.find(m => (0, _lodash.startsWith)(id, m.id));
  let bucketsPath = String(id);

  switch (metric.type) {
    case 'derivative':
      bucketsPath += '[normalized_value]';
      break;
    // For percentiles we need to breakout the percentile key that the user
    // specified. This information is stored in the key using the following pattern
    // {metric.id}[{percentile}]
    case 'percentile':
      if (percentileTest.test(bucketsPath)) break;
      const percent = metric.percentiles[0];
      const percentileKey = percentileNumberTest.test(`${percent.value}`) ? `${percent.value}` : `${percent.value}.0`;
      bucketsPath += `[${percentileKey}]`;
      break;
    case 'percentile_rank':
      bucketsPath += `[${metric.value}]`;
      break;
    case 'std_deviation':
    case 'variance':
    case 'sum_of_squares':
      if (/^std_deviation/.test(metric.type) && ~['upper', 'lower'].indexOf(metric.mode)) {
        bucketsPath += `[std_${metric.mode}]`;
      } else {
        bucketsPath += `[${metric.type}]`;
      }
      break;
  }

  return bucketsPath;
};

module.exports = exports['default'];
