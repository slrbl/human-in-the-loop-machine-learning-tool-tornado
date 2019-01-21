'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.timeBucketsToPairs = timeBucketsToPairs;
exports.flattenBucket = flattenBucket;
exports.default = toSeriesList;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function timeBucketsToPairs(buckets) {
  const timestamps = _lodash2.default.pluck(buckets, 'key');
  const series = {};
  _lodash2.default.each(buckets, function (bucket) {
    _lodash2.default.forOwn(bucket, function (val, key) {
      if (_lodash2.default.isPlainObject(val)) {
        if (val.values) {
          _lodash2.default.forOwn(val.values, function (bucketValue, bucketKey) {
            const k = key + ':' + bucketKey;
            const v = isNaN(bucketValue) ? NaN : bucketValue;
            series[k] = series[k] || [];
            series[k].push(v);
          });
        } else {
          series[key] = series[key] || [];
          series[key].push(val.value);
        }
      }
    });
  });

  return _lodash2.default.mapValues(series, function (values) {
    return _lodash2.default.zip(timestamps, values);
  });
}

function flattenBucket(bucket, splitKey, path, result) {
  result = result || {};
  path = path || [];
  _lodash2.default.forOwn(bucket, function (val, key) {
    if (!_lodash2.default.isPlainObject(val)) return;
    if (_lodash2.default.get(val, 'meta.type') === 'split') {
      _lodash2.default.each(val.buckets, function (bucket, bucketKey) {
        if (bucket.key == null) bucket.key = bucketKey; // For handling "keyed" response formats, eg filters agg
        flattenBucket(bucket, bucket.key, path.concat([key + ':' + bucket.key]), result);
      });
    } else if (_lodash2.default.get(val, 'meta.type') === 'time_buckets') {
      const metrics = timeBucketsToPairs(val.buckets);
      _lodash2.default.each(metrics, function (pairs, metricName) {
        result[path.concat([metricName]).join(' > ')] = {
          data: pairs,
          splitKey: splitKey
        };
      });
    }
  });
  return result;
}

function toSeriesList(aggs, config) {
  return _lodash2.default.map(flattenBucket(aggs), function (metrics, name) {
    return {
      data: metrics.data,
      type: 'series',
      fit: config.fit,
      label: name,
      split: metrics.splitKey
    };
  });
}
