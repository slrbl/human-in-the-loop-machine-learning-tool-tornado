'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.INTERVAL_STRING_RE = exports.GTE_INTERVAL_RE = undefined;

var _datemath = require('@elastic/datemath');

var _datemath2 = _interopRequireDefault(_datemath);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GTE_INTERVAL_RE = exports.GTE_INTERVAL_RE = new RegExp(`^>=([\\d\\.]*\\s*(${_datemath2.default.units.join('|')}))$`);
const INTERVAL_STRING_RE = exports.INTERVAL_STRING_RE = new RegExp('^([0-9\\.]*)\\s*(' + _datemath2.default.units.join('|') + ')$');
