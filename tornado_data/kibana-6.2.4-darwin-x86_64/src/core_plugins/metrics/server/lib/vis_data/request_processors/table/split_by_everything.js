'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitByEverything;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function splitByEverything(req, panel) {
  return next => doc => {
    panel.series.filter(c => !(c.aggregate_by && c.aggregate_function)).forEach(column => {
      if (column.filter) {
        _lodash2.default.set(doc, `aggs.pivot.aggs.${column.id}.filter.query_string.query`, column.filter);
        _lodash2.default.set(doc, `aggs.pivot.aggs.${column.id}.filter.query_string.analyze_wildcard`, true);
      } else {
        _lodash2.default.set(doc, `aggs.pivot.aggs.${column.id}.filter.match_all`, {});
      }
    });
    return next(doc);
  };
}
module.exports = exports['default'];
