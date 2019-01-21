'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.getSearchDsl = getSearchDsl;

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _query_params = require('./query_params');

var _sorting_params = require('./sorting_params');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getSearchDsl(mappings, options = {}) {
  const type = options.type,
        search = options.search,
        searchFields = options.searchFields,
        sortField = options.sortField,
        sortOrder = options.sortOrder;


  if (!type && sortField) {
    throw _boom2.default.notAcceptable('Cannot sort without filtering by type');
  }

  if (sortOrder && !sortField) {
    throw _boom2.default.notAcceptable('sortOrder requires a sortField');
  }

  return _extends({}, (0, _query_params.getQueryParams)(mappings, type, search, searchFields), (0, _sorting_params.getSortingParams)(mappings, type, sortField, sortOrder));
}
