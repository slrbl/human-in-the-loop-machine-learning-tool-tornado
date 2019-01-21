'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = seriesAgg;

var _series_agg = require('./_series_agg');

var _series_agg2 = _interopRequireDefault(_series_agg);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _get_default_decoration = require('../../helpers/get_default_decoration');

var _get_default_decoration2 = _interopRequireDefault(_get_default_decoration);

var _calculate_label = require('../../../../../common/calculate_label');

var _calculate_label2 = _interopRequireDefault(_calculate_label);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function seriesAgg(resp, panel, series) {
  return next => results => {
    if (series.metrics.some(m => m.type === 'series_agg')) {
      const decoration = (0, _get_default_decoration2.default)(series);

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
      const data = series.metrics.filter(m => m.type === 'series_agg').reduce((acc, m) => {
        const fn = _series_agg2.default[m.function];
        return fn && fn(acc) || acc;
      }, targetSeries);
      results.push(_extends({
        id: `${series.id}`,
        label: series.label || (0, _calculate_label2.default)(_lodash2.default.last(series.metrics), series.metrics),
        color: series.color,
        data: _lodash2.default.first(data)
      }, decoration));
    }
    return next(results);
  };
}
module.exports = exports['default'];
