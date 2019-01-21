'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.pkg = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _path = require('path');

const pkg = exports.pkg = _extends({
  __filename: require.resolve('../../package.json'),
  __dirname: (0, _path.dirname)(require.resolve('../../package.json'))
}, require('../../package.json'));
