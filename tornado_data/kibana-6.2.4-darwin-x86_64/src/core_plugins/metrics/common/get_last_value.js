'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (data, lookback = 1) => {
  if (_lodash2.default.isNumber(data)) return data;
  if (!Array.isArray(data)) return 0;
  // First try the last value
  const last = data[data.length - 1];
  const lastValue = Array.isArray(last) && last[1];
  if (lastValue) return lastValue;

  // If the last value is zero or null because of a partial bucket or
  // some kind of timeshift weirdness we will show the second to last.
  let lookbackCounter = 1;
  let value;
  while (lookback > lookbackCounter && !value) {
    const next = data[data.length - ++lookbackCounter];
    value = _lodash2.default.isArray(next) && next[1] || 0;
  }
  return value || 0;
};

module.exports = exports['default'];
