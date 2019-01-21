'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dateHistogram;

var _get_bucket_size = require('../../helpers/get_bucket_size');

var _get_bucket_size2 = _interopRequireDefault(_get_bucket_size);

var _offset_time = require('../../offset_time');

var _offset_time2 = _interopRequireDefault(_offset_time);

var _get_interval_and_timefield = require('../../get_interval_and_timefield');

var _get_interval_and_timefield2 = _interopRequireDefault(_get_interval_and_timefield);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dateHistogram(req, panel, series) {
  return next => doc => {
    var _getIntervalAndTimefi = (0, _get_interval_and_timefield2.default)(panel, series);

    const timeField = _getIntervalAndTimefi.timeField,
          interval = _getIntervalAndTimefi.interval;

    var _getBucketSize = (0, _get_bucket_size2.default)(req, interval);

    const intervalString = _getBucketSize.intervalString;

    var _offsetTime = (0, _offset_time2.default)(req, series.offset_time);

    const from = _offsetTime.from,
          to = _offsetTime.to;
    const timezone = req.payload.timerange.timezone;


    (0, _lodash.set)(doc, `aggs.${series.id}.aggs.timeseries.date_histogram`, {
      field: timeField,
      interval: intervalString,
      min_doc_count: 0,
      time_zone: timezone,
      extended_bounds: {
        min: from.valueOf(),
        max: to.valueOf()
      }
    });
    return next(doc);
  };
}
module.exports = exports['default'];
