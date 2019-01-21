'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createIpFormat = createIpFormat;
function createIpFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class IpFormat extends FieldFormat {
    _convert(val) {
      if (val === undefined || val === null) return '-';
      if (!isFinite(val)) return val;

      // shazzam!
      return [val >>> 24, val >>> 16 & 0xFF, val >>> 8 & 0xFF, val & 0xFF].join('.');
    }

  }, _class.id = 'ip', _class.title = 'IP Address', _class.fieldType = 'ip', _temp;
}
