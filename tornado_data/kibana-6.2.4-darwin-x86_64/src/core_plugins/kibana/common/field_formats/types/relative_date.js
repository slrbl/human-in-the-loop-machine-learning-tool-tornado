'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createRelativeDateFormat = createRelativeDateFormat;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createRelativeDateFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class RelativeDateFormat extends FieldFormat {
    constructor(params) {
      super(params);
    }

    _convert(val) {
      if (val === null || val === undefined) {
        return '-';
      }

      const date = (0, _moment2.default)(val);
      if (date.isValid()) {
        return date.fromNow();
      } else {
        return val;
      }
    }

  }, _class.id = 'relative_date', _class.title = 'Relative Date', _class.fieldType = 'date', _temp;
}
