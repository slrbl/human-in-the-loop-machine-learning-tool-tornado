'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.calculateAggRoot = calculateAggRoot;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateAggRoot(doc, column) {
  let aggRoot = `aggs.pivot.aggs.${column.id}.aggs`;
  if (_lodash2.default.has(doc, `aggs.pivot.aggs.${column.id}.aggs.column_filter`)) {
    aggRoot = `aggs.pivot.aggs.${column.id}.aggs.column_filter.aggs`;
  }
  return aggRoot;
}
