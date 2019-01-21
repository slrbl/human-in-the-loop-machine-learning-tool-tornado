'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (tlConfig) {
  const min = (0, _moment2.default)(tlConfig.time.from);
  const max = (0, _moment2.default)(tlConfig.time.to);

  const intervalParts = (0, _split_interval2.default)(tlConfig.time.interval);

  let current = min.startOf(intervalParts.unit);

  const targetSeries = [];

  while (current.valueOf() < max.valueOf()) {
    targetSeries.push(current.valueOf());
    current = current.add(intervalParts.count, intervalParts.unit);
  }

  return targetSeries;
};

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

var _split_interval = require('./split_interval.js');

var _split_interval2 = _interopRequireDefault(_split_interval);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
