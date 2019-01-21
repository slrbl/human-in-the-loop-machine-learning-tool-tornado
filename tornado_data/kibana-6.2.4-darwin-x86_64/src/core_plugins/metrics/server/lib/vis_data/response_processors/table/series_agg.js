'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = seriesAgg;

var _series_agg = require('./_series_agg');

var _series_agg2 = _interopRequireDefault(_series_agg);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _calculate_label = require('../../../../../common/calculate_label');

var _calculate_label2 = _interopRequireDefault(_calculate_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function seriesAgg(resp, panel, series) {
  return next => results => {
    if (series.aggregate_by && series.aggregate_function) {

      const targetSeries = [];
      // Filter out the seires with the matching metric and store them
      // in targetSeries
      results = results.filter(s => {
        if (s.id.split(/:/)[0] === series.id) {
          targetSeries.push(s.data);
          return false;
        }
        return true;
      });
      const fn = _series_agg2.default[series.aggregate_function];
      const data = fn(targetSeries);
      results.push({
        id: `${series.id}`,
        label: series.label || (0, _calculate_label2.default)(_lodash2.default.last(series.metrics), series.metrics),
        data: _lodash2.default.first(data)
      });
    }
    return next(results);
  };
}
module.exports = exports['default'];
