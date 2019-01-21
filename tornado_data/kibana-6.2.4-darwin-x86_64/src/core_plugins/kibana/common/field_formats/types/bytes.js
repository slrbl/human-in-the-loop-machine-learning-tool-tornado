'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createBytesFormat = createBytesFormat;

var _numeral = require('./_numeral');

function createBytesFormat(FieldFormat) {
  return (0, _numeral.createNumeralFormat)(FieldFormat, {
    id: 'bytes',
    title: 'Bytes'
  });
}
