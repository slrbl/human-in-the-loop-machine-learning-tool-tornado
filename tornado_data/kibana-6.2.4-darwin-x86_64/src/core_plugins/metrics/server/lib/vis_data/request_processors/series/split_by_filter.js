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
    if (series.split_mode !== 'filter') return next(doc);
    _lodash2.default.set(doc, `aggs.${series.id}.filter.query_string.query`, series.filter || '*');
    _lodash2.default.set(doc, `aggs.${series.id}.filter.query_string.analyze_wildcard`, true);
    return next(doc);
  };
}
module.exports = exports['default'];
