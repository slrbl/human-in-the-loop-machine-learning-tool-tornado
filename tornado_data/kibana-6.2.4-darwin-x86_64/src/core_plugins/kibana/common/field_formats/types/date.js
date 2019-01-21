'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createDateFormat = createDateFormat;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createDateFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class DateFormat extends FieldFormat {
    constructor(params, getConfig) {
      super(params);

      this.getConfig = getConfig;
    }

    getParamDefaults() {
      return {
        pattern: this.getConfig('dateFormat'),
        timezone: this.getConfig('dateFormat:tz')
      };
    }

    _convert(val) {
      // don't give away our ref to converter so
      // we can hot-swap when config changes
      const pattern = this.param('pattern');
      const timezone = this.param('timezone');

      const timezoneChanged = this._timeZone !== timezone;
      const datePatternChanged = this._memoizedPattern !== pattern;
      if (timezoneChanged || datePatternChanged) {
        this._timeZone = timezone;
        this._memoizedPattern = pattern;

        this._memoizedConverter = _lodash2.default.memoize(function converter(val) {
          if (val === null || val === undefined) {
            return '-';
          }

          const date = (0, _moment2.default)(val);
          if (date.isValid()) {
            return date.format(pattern);
          } else {
            return val;
          }
        });
      }

      return this._memoizedConverter(val);
    }

  }, _class.id = 'date', _class.title = 'Date', _class.fieldType = 'date', _temp;
}
