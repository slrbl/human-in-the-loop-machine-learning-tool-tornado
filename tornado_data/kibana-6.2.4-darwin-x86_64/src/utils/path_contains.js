'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = pathContains;

var _path = require('path');

function pathContains(root, child) {
  return (0, _path.relative)(child, root).slice(0, 2) !== '..';
}
module.exports = exports['default'];
