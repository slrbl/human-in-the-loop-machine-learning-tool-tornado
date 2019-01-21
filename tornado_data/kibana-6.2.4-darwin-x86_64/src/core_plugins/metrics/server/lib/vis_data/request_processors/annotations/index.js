'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _query = require('./query');

var _query2 = _interopRequireDefault(_query);

var _date_histogram = require('./date_histogram');

var _date_histogram2 = _interopRequireDefault(_date_histogram);

var _top_hits = require('./top_hits');

var _top_hits2 = _interopRequireDefault(_top_hits);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = [_query2.default, _date_histogram2.default, _top_hits2.default];
module.exports = exports['default'];
