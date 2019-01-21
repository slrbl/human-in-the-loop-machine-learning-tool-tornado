'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.createColorFormat = createColorFormat;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _as_pretty_string = require('../../utils/as_pretty_string');

var _color_default = require('./color_default');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const convertTemplate = _lodash2.default.template('<span style="<%- style %>"><%- val %></span>');

function createColorFormat(FieldFormat) {
  class ColorFormat extends FieldFormat {
    getParamDefaults() {
      return {
        fieldType: null, // populated by editor, see controller below
        colors: [_lodash2.default.cloneDeep(_color_default.DEFAULT_COLOR)]
      };
    }

    findColorRuleForVal(val) {
      switch (this.param('fieldType')) {
        case 'string':
          return _lodash2.default.findLast(this.param('colors'), colorParam => {
            return new RegExp(colorParam.regex).test(val);
          });

        case 'number':
          return _lodash2.default.findLast(this.param('colors'), ({ range }) => {
            if (!range) return;

            var _range$split = range.split(':'),
                _range$split2 = _slicedToArray(_range$split, 2);

            const start = _range$split2[0],
                  end = _range$split2[1];

            return val >= Number(start) && val <= Number(end);
          });

        default:
          return null;
      }
    }

  }

  ColorFormat.id = 'color';
  ColorFormat.title = 'Color';
  ColorFormat.fieldType = ['number', 'string'];
  ColorFormat.prototype._convert = {
    html(val) {
      const color = this.findColorRuleForVal(val);
      if (!color) return _lodash2.default.escape((0, _as_pretty_string.asPrettyString)(val));

      let style = '';
      if (color.text) style += `color: ${color.text};`;
      if (color.background) style += `background-color: ${color.background};`;
      return convertTemplate({ val, style });
    }
  };

  return ColorFormat;
}
