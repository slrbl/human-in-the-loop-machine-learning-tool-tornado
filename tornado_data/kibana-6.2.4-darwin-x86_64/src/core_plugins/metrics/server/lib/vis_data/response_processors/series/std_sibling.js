'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = stdSibling;

var _get_default_decoration = require('../../helpers/get_default_decoration');

var _get_default_decoration2 = _interopRequireDefault(_get_default_decoration);

var _get_splits = require('../../helpers/get_splits');

var _get_splits2 = _interopRequireDefault(_get_splits);

var _get_last_metric = require('../../helpers/get_last_metric');

var _get_last_metric2 = _interopRequireDefault(_get_last_metric);

var _get_sibling_agg_value = require('../../helpers/get_sibling_agg_value');

var _get_sibling_agg_value2 = _interopRequireDefault(_get_sibling_agg_value);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function stdSibling(resp, panel, series) {
  return next => results => {
    const metric = (0, _get_last_metric2.default)(series);

    if (!/_bucket$/.test(metric.type)) return next(results);
    if (metric.type === 'std_deviation_bucket' && metric.mode === 'band') return next(results);

    const decoration = (0, _get_default_decoration2.default)(series);
    (0, _get_splits2.default)(resp, panel, series).forEach(split => {
      const data = split.timeseries.buckets.map(bucket => {
        return [bucket.key, (0, _get_sibling_agg_value2.default)(split, metric)];
      });
      results.push(_extends({
        id: split.id,
        label: split.label,
        color: split.color,
        data
      }, decoration));
    });
    return next(results);
  };
}
module.exports = exports['default'];
