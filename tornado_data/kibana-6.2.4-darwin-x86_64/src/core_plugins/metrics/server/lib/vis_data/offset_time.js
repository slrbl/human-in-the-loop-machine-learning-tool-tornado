'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offsetTime;

var _get_timerange = require('./helpers/get_timerange');

var _get_timerange2 = _interopRequireDefault(_get_timerange);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function offsetTime(req, by) {
  var _getTimerange = (0, _get_timerange2.default)(req);

  const from = _getTimerange.from,
        to = _getTimerange.to;

  if (!/^[+-]?([\d]+)([shmdwMy]|ms)$/.test(by)) return { from, to };
  const matches = by.match(/^([+-]?[\d]+)([shmdwMy]|ms)$/);
  const offsetValue = Number(matches[1]);
  const offsetUnit = matches[2];
  return {
    from: from.clone().subtract(offsetValue, offsetUnit),
    to: to.clone().subtract(offsetValue, offsetUnit)
  };
}
module.exports = exports['default'];
