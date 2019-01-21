'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = stdMetric;

var _get_default_decoration = require('../../helpers/get_default_decoration');

var _get_default_decoration2 = _interopRequireDefault(_get_default_decoration);

var _get_splits = require('../../helpers/get_splits');

var _get_splits2 = _interopRequireDefault(_get_splits);

var _get_last_metric = require('../../helpers/get_last_metric');

var _get_last_metric2 = _interopRequireDefault(_get_last_metric);

var _map_bucket = require('../../helpers/map_bucket');

var _map_bucket2 = _interopRequireDefault(_map_bucket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stdMetric(resp, panel, series) {
  return next => results => {
    const metric = (0, _get_last_metric2.default)(series);
    if (metric.type === 'std_deviation' && metric.mode === 'band') {
      return next(results);
    }
    if (metric.type === 'percentile') {
      return next(results);
    }
    if (/_bucket$/.test(metric.type)) return next(results);
    const decoration = (0, _get_default_decoration2.default)(series);
    (0, _get_splits2.default)(resp, panel, series).forEach(split => {
      const data = split.timeseries.buckets.map((0, _map_bucket2.default)(metric));
      results.push(_extends({
        id: `${split.id}`,
        label: split.label,
        color: split.color,
        data
      }, decoration));
    });
    return next(results);
  };
}
module.exports = exports['default'];
