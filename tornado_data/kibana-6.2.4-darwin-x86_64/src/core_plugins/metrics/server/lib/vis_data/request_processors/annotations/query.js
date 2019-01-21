'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = query;

var _get_bucket_size = require('../../helpers/get_bucket_size');

var _get_bucket_size2 = _interopRequireDefault(_get_bucket_size);

var _get_timerange = require('../../helpers/get_timerange');

var _get_timerange2 = _interopRequireDefault(_get_timerange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function query(req, panel, annotation) {
  return next => doc => {
    const timeField = annotation.time_field;

    var _getBucketSize = (0, _get_bucket_size2.default)(req, 'auto');

    const bucketSize = _getBucketSize.bucketSize;

    var _getTimerange = (0, _get_timerange2.default)(req);

    const from = _getTimerange.from,
          to = _getTimerange.to;


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
          lte: to.valueOf() - bucketSize * 1000,
          format: 'epoch_millis'
        }
      }
    };
    doc.query.bool.must.push(timerange);

    if (annotation.query_string) {
      doc.query.bool.must.push({
        query_string: {
          query: annotation.query_string,
          analyze_wildcard: true
        }
      });
    }

    const globalFilters = req.payload.filters;
    if (!annotation.ignore_global_filters) {
      doc.query.bool.must = doc.query.bool.must.concat(globalFilters);
    }

    if (!annotation.ignore_panel_filters && panel.filter) {
      doc.query.bool.must.push({
        query_string: {
          query: panel.filter,
          analyze_wildcard: true
        }
      });
    }

    if (annotation.fields) {
      const fields = annotation.fields.split(/[,\s]+/) || [];
      fields.forEach(field => {
        doc.query.bool.must.push({ exists: { field } });
      });
    }

    return next(doc);
  };
}
module.exports = exports['default'];
