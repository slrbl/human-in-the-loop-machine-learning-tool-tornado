'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = parseSheet;

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _pegjs = require('pegjs');

var _pegjs2 = _interopRequireDefault(_pegjs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const grammar = _fs2.default.readFileSync(_path2.default.resolve(__dirname, '../../../public/chain.peg'), 'utf8');

const Parser = _pegjs2.default.buildParser(grammar);

function parseSheet(sheet) {
  return _lodash2.default.map(sheet, function (plot) {
    try {
      return Parser.parse(plot).tree;
    } catch (e) {
      if (e.expected) {
        throw new Error('Expected: ' + e.expected[0].description + ' @ character ' + e.column);
      } else {
        throw e;
      }
    }
  });
}
module.exports = exports['default'];
