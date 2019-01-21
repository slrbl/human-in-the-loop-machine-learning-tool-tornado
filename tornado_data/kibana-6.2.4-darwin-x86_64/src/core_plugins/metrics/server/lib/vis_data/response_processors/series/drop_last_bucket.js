'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropLastBucket = dropLastBucket;

var _lodash = require('lodash');

function dropLastBucket(resp, panel, series) {
  return next => results => {
    const seriesDropLastBucket = (0, _lodash.get)(series, 'override_drop_last_bucket', 1);
    const dropLastBucket = (0, _lodash.get)(panel, 'drop_last_bucket', seriesDropLastBucket);
    if (dropLastBucket) {
      results.forEach(item => {
        item.data = item.data.slice(0, item.data.length - 1);
      });
    }
    return next(results);
  };
}
