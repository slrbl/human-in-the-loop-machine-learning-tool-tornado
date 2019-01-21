'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = metricBuckets;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _get_bucket_size = require('../../helpers/get_bucket_size');

var _get_bucket_size2 = _interopRequireDefault(_get_bucket_size);

var _bucket_transform = require('../../helpers/bucket_transform');

var _bucket_transform2 = _interopRequireDefault(_bucket_transform);

var _get_interval_and_timefield = require('../../get_interval_and_timefield');

var _get_interval_and_timefield2 = _interopRequireDefault(_get_interval_and_timefield);

var _calculate_agg_root = require('./calculate_agg_root');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function metricBuckets(req, panel) {
  return next => doc => {
    var _getIntervalAndTimefi = (0, _get_interval_and_timefield2.default)(panel);

    const interval = _getIntervalAndTimefi.interval;

    var _getBucketSize = (0, _get_bucket_size2.default)(req, interval);

    const intervalString = _getBucketSize.intervalString;

    panel.series.forEach(column => {
      const aggRoot = (0, _calculate_agg_root.calculateAggRoot)(doc, column);
      column.metrics.filter(row => !/_bucket$/.test(row.type) && !/^series/.test(row.type)).forEach(metric => {
        const fn = _bucket_transform2.default[metric.type];
        if (fn) {
          try {
            const bucket = fn(metric, column.metrics, intervalString);
            _lodash2.default.set(doc, `${aggRoot}.timeseries.aggs.${metric.id}`, bucket);
          } catch (e) {
            // meh
          }
        }
      });
    });
    return next(doc);
  };
}
module.exports = exports['default'];
