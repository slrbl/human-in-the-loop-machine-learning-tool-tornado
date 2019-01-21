'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (expr) {
  const match = expr.match(parseRE);
  if (match) {
    if (match[2] === 'M' && match[1] !== '1') {
      throw new Error('Invalid interval. 1M is only valid monthly interval.');
    }

    return parseFloat(match[1] || 1) * vals[match[2]];
  }
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// map of moment's short/long unit ids and elasticsearch's long unit ids
// to their value in milliseconds
const vals = _lodash2.default.transform([['ms', 'milliseconds', 'millisecond'], ['s', 'seconds', 'second', 'sec'], ['m', 'minutes', 'minute', 'min'], ['h', 'hours', 'hour'], ['d', 'days', 'day'], ['w', 'weeks', 'week'], ['M', 'months', 'month'], ['quarter'], ['y', 'years', 'year']], function (vals, units) {
  const normal = _moment2.default.normalizeUnits(units[0]);
  const val = _moment2.default.duration(1, normal).asMilliseconds();
  [].concat(normal, units).forEach(function (unit) {
    vals[unit] = val;
  });
}, {});
// match any key from the vals object prececed by an optional number
const parseRE = new RegExp('^(\\d+(?:\\.\\d*)?)?\\s*(' + _lodash2.default.keys(vals).join('|') + ')$');

module.exports = exports['default'];
