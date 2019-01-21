'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dropLastBucketFn = dropLastBucketFn;

var _drop_last_bucket = require('../series/drop_last_bucket');

function dropLastBucketFn(bucket, panel, series) {
  return next => results => {
    const fn = (0, _drop_last_bucket.dropLastBucket)({ aggregations: bucket }, panel, series);
    return fn(next)(results);
  };
}
