'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeAtType = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _lib = require('./lib');

const mergeAtType = exports.mergeAtType = (0, _lib.createTypeReducer)((a, b) => _extends({}, a, b));
