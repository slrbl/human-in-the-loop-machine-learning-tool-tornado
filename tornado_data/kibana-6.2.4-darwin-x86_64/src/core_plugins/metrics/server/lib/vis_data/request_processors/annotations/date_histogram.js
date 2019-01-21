'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = dateHistogram;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _get_bucket_size = require('../../helpers/get_bucket_size');

var _get_bucket_size2 = _interopRequireDefault(_get_bucket_size);

var _get_timerange = require('../../helpers/get_timerange');

var _get_timerange2 = _interopRequireDefault(_get_timerange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function dateHistogram(req, panel, annotation) {
  return next => doc => {
    const timeField = annotation.time_field;

    var _getBucketSize = (0, _get_bucket_size2.default)(req, 'auto');

    const bucketSize = _getBucketSize.bucketSize,
          intervalString = _getBucketSize.intervalString;

    var _getTimerange = (0, _get_timerange2.default)(req);

    const from = _getTimerange.from,
          to = _getTimerange.to;
    const timezone = req.payload.timerange.timezone;

    _lodash2.default.set(doc, `aggs.${annotation.id}.date_histogram`, {
      field: timeField,
      interval: intervalString,
      min_doc_count: 0,
      time_zone: timezone,
      extended_bounds: {
        min: from.valueOf(),
        max: to.valueOf() - bucketSize * 1000
      }
    });
    return next(doc);
  };
}
module.exports = exports['default'];
