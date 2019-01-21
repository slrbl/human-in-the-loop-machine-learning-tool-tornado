'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitByTerm;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function splitByTerm(req, panel) {
  return next => doc => {
    panel.series.filter(c => c.aggregate_by && c.aggregate_function).forEach(column => {
      _lodash2.default.set(doc, `aggs.pivot.aggs.${column.id}.terms.field`, column.aggregate_by);
      _lodash2.default.set(doc, `aggs.pivot.aggs.${column.id}.terms.size`, 100);
      if (column.filter) {
        _lodash2.default.set(doc, `aggs.pivot.aggs.${column.id}.column_filter.filter.query_string.query`, column.filter);
        _lodash2.default.set(doc, `aggs.pivot.aggs.${column.id}.column_filter.filter.query_string.analyze_wildcard`, true);
      }
    });
    return next(doc);
  };
}
module.exports = exports['default'];
