'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dateHistogram;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _get_bucket_size = require('../../helpers/get_bucket_size');

var _get_bucket_size2 = _interopRequireDefault(_get_bucket_size);

var _get_interval_and_timefield = require('../../get_interval_and_timefield');

var _get_interval_and_timefield2 = _interopRequireDefault(_get_interval_and_timefield);

var _get_timerange = require('../../helpers/get_timerange');

var _get_timerange2 = _interopRequireDefault(_get_timerange);

var _calculate_agg_root = require('./calculate_agg_root');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dateHistogram(req, panel) {
  return next => doc => {
    var _getIntervalAndTimefi = (0, _get_interval_and_timefield2.default)(panel);

    const timeField = _getIntervalAndTimefi.timeField,
          interval = _getIntervalAndTimefi.interval;

    var _getBucketSize = (0, _get_bucket_size2.default)(req, interval);

    const intervalString = _getBucketSize.intervalString;

    var _getTimerange = (0, _get_timerange2.default)(req);

    const from = _getTimerange.from,
          to = _getTimerange.to;

    panel.series.forEach(column => {
      const aggRoot = (0, _calculate_agg_root.calculateAggRoot)(doc, column);
      _lodash2.default.set(doc, `${aggRoot}.timeseries.date_histogram`, {
        field: timeField,
        interval: intervalString,
        min_doc_count: 0,
        extended_bounds: {
          min: from.valueOf(),
          max: to.valueOf()
        }
      });
    });
    return next(doc);
  };
}
module.exports = exports['default'];
