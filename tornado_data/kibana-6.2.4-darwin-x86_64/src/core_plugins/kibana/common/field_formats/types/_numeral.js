'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createNumeralFormat = createNumeralFormat;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _numeral = require('@elastic/numeral');

var _numeral2 = _interopRequireDefault(_numeral);

var _languages = require('@elastic/numeral/languages');

var _languages2 = _interopRequireDefault(_languages);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const numeralInst = (0, _numeral2.default)();

_languages2.default.forEach(function (numeralLanguage) {
  _numeral2.default.language(numeralLanguage.id, numeralLanguage.lang);
});

function createNumeralFormat(FieldFormat, opts) {
  class NumeralFormat extends FieldFormat {

    constructor(params, getConfig) {
      super(params);
      this.getConfig = getConfig;
    }

    getParamDefaults() {
      if (_lodash2.default.has(opts, 'getParamDefaults')) {
        return opts.getParamDefaults(this.getConfig);
      }

      return {
        pattern: this.getConfig(`format:${opts.id}:defaultPattern`)
      };
    }

    _convert(val) {
      if (val === -Infinity) return '-∞';
      if (val === +Infinity) return '+∞';
      if (typeof val !== 'number') {
        val = parseFloat(val);
      }

      if (isNaN(val)) return '';

      const previousLocale = _numeral2.default.language();
      const defaultLocale = this.getConfig && this.getConfig('format:number:defaultLocale') || 'en';
      _numeral2.default.language(defaultLocale);

      const formatted = numeralInst.set(val).format(this.param('pattern'));

      _numeral2.default.language(previousLocale);

      return opts.afterConvert ? opts.afterConvert.call(this, formatted) : formatted;
    }
  }

  NumeralFormat.id = opts.id;
  NumeralFormat.title = opts.title;
  NumeralFormat.fieldType = 'number';
  if (opts.prototype) {
    _lodash2.default.assign(NumeralFormat.prototype, opts.prototype);
  }

  return NumeralFormat;
}
