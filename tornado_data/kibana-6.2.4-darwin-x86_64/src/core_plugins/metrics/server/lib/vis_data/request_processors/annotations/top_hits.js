'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = topHits;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function topHits(req, panel, annotation) {
  return next => doc => {
    const fields = annotation.fields && annotation.fields.split(/[,\s]+/) || [];
    const timeField = annotation.time_field;
    _lodash2.default.set(doc, `aggs.${annotation.id}.aggs.hits.top_hits`, {
      sort: [{
        [timeField]: { order: 'desc' }
      }],
      _source: {
        includes: [...fields, timeField]
      },
      size: 5
    });
    return next(doc);
  };
}
module.exports = exports['default'];
