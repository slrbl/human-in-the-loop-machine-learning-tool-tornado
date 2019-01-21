'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createStringFormat = createStringFormat;

var _as_pretty_string = require('../../utils/as_pretty_string');

var _shorten_dotted_string = require('../../utils/shorten_dotted_string');

function createStringFormat(FieldFormat) {
  var _class, _temp;

  return _temp = _class = class StringFormat extends FieldFormat {
    getParamDefaults() {
      return {
        transform: false
      };
    }

    _base64Decode(val) {
      try {
        return Buffer.from(val, 'base64').toString('utf8');
      } catch (e) {
        return (0, _as_pretty_string.asPrettyString)(val);
      }
    }

    _toTitleCase(val) {
      return val.replace(/\w\S*/g, txt => {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      });
    }

    _convert(val) {
      switch (this.param('transform')) {
        case 'lower':
          return String(val).toLowerCase();
        case 'upper':
          return String(val).toUpperCase();
        case 'title':
          return this._toTitleCase(val);
        case 'short':
          return (0, _shorten_dotted_string.shortenDottedString)(val);
        case 'base64':
          return this._base64Decode(val);
        default:
          return (0, _as_pretty_string.asPrettyString)(val);
      }
    }

  }, _class.id = 'string', _class.title = 'String', _class.fieldType = ['number', 'boolean', 'date', 'ip', 'attachment', 'geo_point', 'geo_shape', 'string', 'murmur3', 'unknown', 'conflict'], _temp;
}
