'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = query;

var _offset_time = require('../../offset_time');

var _offset_time2 = _interopRequireDefault(_offset_time);

var _get_interval_and_timefield = require('../../get_interval_and_timefield');

var _get_interval_and_timefield2 = _interopRequireDefault(_get_interval_and_timefield);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function query(req, panel, series) {
  return next => doc => {
    var _getIntervalAndTimefi = (0, _get_interval_and_timefield2.default)(panel, series);

    const timeField = _getIntervalAndTimefi.timeField;

    var _offsetTime = (0, _offset_time2.default)(req, series.offset_time);

    const from = _offsetTime.from,
          to = _offsetTime.to;


    doc.size = 0;
    doc.query = {
      bool: {
        must: []
      }
    };

    const timerange = {
      range: {
        [timeField]: {
          gte: from.valueOf(),
          lte: to.valueOf(),
          format: 'epoch_millis'
        }
      }
    };
    doc.query.bool.must.push(timerange);

    const globalFilters = req.payload.filters;
    if (globalFilters && !panel.ignore_global_filter) {
      doc.query.bool.must = doc.query.bool.must.concat(globalFilters);
    }

    if (panel.filter) {
      doc.query.bool.must.push({
        query_string: {
          query: panel.filter,
          analyze_wildcard: true
        }
      });
    }

    if (series.filter) {
      doc.query.bool.must.push({
        query_string: {
          query: series.filter,
          analyze_wildcard: true
        }
      });
    }

    return next(doc);
  };
}
module.exports = exports['default'];
