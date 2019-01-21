'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = setHeaders;

var _lodash = require('lodash');

function setHeaders(originalHeaders, newHeaders) {
  if (!(0, _lodash.isPlainObject)(originalHeaders)) {
    throw new Error(`Expected originalHeaders to be an object, but ${typeof originalHeaders} given`);
  }
  if (!(0, _lodash.isPlainObject)(newHeaders)) {
    throw new Error(`Expected newHeaders to be an object, but ${typeof newHeaders} given`);
  }

  return _extends({}, originalHeaders, newHeaders);
}
module.exports = exports['default'];
