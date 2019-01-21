'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createTruncateFormat = createTruncateFormat;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const omission = '...';

function createTruncateFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class TruncateFormat extends FieldFormat {
    _convert(val) {
      const length = this.param('fieldLength');
      if (length > 0) {
        return _lodash2.default.trunc(val, {
          'length': length + omission.length,
          'omission': omission
        });
      }

      return val;
    }

  }, _class.id = 'truncate', _class.title = 'Truncated String', _class.fieldType = ['string'], _temp;
}
