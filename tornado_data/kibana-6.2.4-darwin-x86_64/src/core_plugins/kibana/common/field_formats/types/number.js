'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNumberFormat = createNumberFormat;

var _numeral = require('./_numeral');

function createNumberFormat(FieldFormat) {
  return (0, _numeral.createNumeralFormat)(FieldFormat, {
    id: 'number',
    title: 'Number'
  });
}
