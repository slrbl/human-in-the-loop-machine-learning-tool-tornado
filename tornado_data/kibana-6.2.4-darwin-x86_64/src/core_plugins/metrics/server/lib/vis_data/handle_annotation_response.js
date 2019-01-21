'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleAnnotationResponse;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function handleAnnotationResponse(resp, annotation) {
  return _lodash2.default.get(resp, `aggregations.${annotation.id}.buckets`, []).filter(bucket => bucket.hits.hits.total).map(bucket => {
    return {
      key: bucket.key,
      docs: bucket.hits.hits.hits.map(doc => doc._source)
    };
  });
}
module.exports = exports['default'];
