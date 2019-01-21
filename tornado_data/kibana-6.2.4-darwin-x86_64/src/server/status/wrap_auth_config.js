'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

exports.default = allowAnonymous => {
  if (allowAnonymous) return options => (0, _lodash.assign)(options, { config: { auth: false } });
  return _lodash.identity;
};

module.exports = exports['default'];
