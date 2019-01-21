'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPercentFormat = createPercentFormat;

var _numeral = require('./_numeral');

function createPercentFormat(FieldFormat) {
  return (0, _numeral.createNumeralFormat)(FieldFormat, {
    id: 'percent',
    title: 'Percentage',
    getParamDefaults: getConfig => {
      return {
        pattern: getConfig('format:percent:defaultPattern'),
        fractional: true
      };
    },
    afterConvert(val) {
      return this.param('fractional') ? val : val / 100;
    }
  });
}
