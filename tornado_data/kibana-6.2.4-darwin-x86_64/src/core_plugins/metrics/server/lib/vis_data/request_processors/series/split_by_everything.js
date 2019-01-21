'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = splitByEverything;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function splitByEverything(req, panel, series) {
  return next => doc => {
    if (series.split_mode === 'everything' || series.split_mode === 'terms' && !series.terms_field) {
      _lodash2.default.set(doc, `aggs.${series.id}.filter.match_all`, {});
    }
    return next(doc);
  };
}
module.exports = exports['default'];
