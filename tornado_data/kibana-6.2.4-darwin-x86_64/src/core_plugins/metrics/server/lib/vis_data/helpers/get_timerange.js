'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getTimerange;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getTimerange(req) {
  const from = _moment2.default.utc(req.payload.timerange.min);
  const to = _moment2.default.utc(req.payload.timerange.max);
  return { from, to };
}
module.exports = exports['default'];
