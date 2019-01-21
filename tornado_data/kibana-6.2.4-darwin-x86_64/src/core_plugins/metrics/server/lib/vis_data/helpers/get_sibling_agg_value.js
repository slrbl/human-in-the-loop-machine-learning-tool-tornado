'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (row, metric) => {
  let key = metric.type.replace(/_bucket$/, '');
  if (key === 'std_deviation' && _lodash2.default.includes(['upper', 'lower'], metric.mode)) {
    key = `std_deviation_bounds.${metric.mode}`;
  }
  return _lodash2.default.get(row, `${metric.id}.${key}`);
};

module.exports = exports['default'];
