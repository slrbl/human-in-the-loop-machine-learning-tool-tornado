'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitByFilter;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function splitByFilter(req, panel, series) {
  return next => doc => {
    if (series.split_mode === 'filters' && series.split_filters) {
      series.split_filters.forEach(filter => {
        _lodash2.default.set(doc, `aggs.${series.id}.filters.filters.${filter.id}.query_string.query`, filter.filter || '*');
        _lodash2.default.set(doc, `aggs.${series.id}.filters.filters.${filter.id}.query_string.analyze_wildcard`, true);
      });
    }
    return next(doc);
  };
}
module.exports = exports['default'];
