'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSortingParams = getSortingParams;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _mappings = require('../../../../mappings');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSortingParams(mappings, type, sortField, sortOrder) {
  if (!sortField) {
    return {};
  }

  const field = (0, _mappings.getProperty)(mappings, `${type}.${sortField}`);
  if (!field) {
    throw _boom2.default.badRequest(`Unknown sort field ${sortField}`);
  }

  return {
    sort: [{
      [`${type}.${sortField}`]: {
        order: sortOrder,
        unmapped_type: field.type
      }
    }]
  };
}
