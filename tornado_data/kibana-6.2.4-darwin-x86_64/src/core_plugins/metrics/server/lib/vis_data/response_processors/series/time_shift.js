'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = timeShift;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function timeShift(resp, panel, series) {
  return next => results => {
    if (/^([+-]?[\d]+)([shmdwMy]|ms)$/.test(series.offset_time)) {
      const matches = series.offset_time.match(/^([+-]?[\d]+)([shmdwMy]|ms)$/);
      if (matches) {
        const offsetValue = matches[1];
        const offsetUnit = matches[2];
        results.forEach(item => {
          if (_lodash2.default.startsWith(item.id, series.id)) {
            item.data = item.data.map(row => [(0, _moment2.default)(row[0]).add(offsetValue, offsetUnit).valueOf(), row[1]]);
          }
        });
      }
    }
    return next(results);
  };
}
module.exports = exports['default'];
