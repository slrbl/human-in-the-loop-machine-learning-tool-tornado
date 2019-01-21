'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.yellow = exports.red = exports.green = undefined;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _ansicolors = require('ansicolors');

var _ansicolors2 = _interopRequireDefault(_ansicolors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const green = exports.green = _lodash2.default.flow(_ansicolors2.default.black, _ansicolors2.default.bgGreen);
const red = exports.red = _lodash2.default.flow(_ansicolors2.default.white, _ansicolors2.default.bgRed);
const yellow = exports.yellow = _lodash2.default.flow(_ansicolors2.default.black, _ansicolors2.default.bgYellow);
