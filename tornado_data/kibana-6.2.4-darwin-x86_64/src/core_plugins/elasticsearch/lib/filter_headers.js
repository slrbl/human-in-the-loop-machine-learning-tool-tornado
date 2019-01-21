'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (originalHeaders, headersToKeep) {
  const normalizeHeader = function normalizeHeader(header) {
    if (!header) {
      return '';
    }
    header = header.toString();
    return header.trim().toLowerCase();
  };

  // Normalize list of headers we want to allow in upstream request
  const headersToKeepNormalized = headersToKeep.map(normalizeHeader);

  return _lodash2.default.pick(originalHeaders, headersToKeepNormalized);
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
