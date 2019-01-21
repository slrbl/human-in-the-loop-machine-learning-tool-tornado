'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.contentTypesSetup = contentTypesSetup;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _as_pretty_string = require('../../core_plugins/kibana/common/utils/as_pretty_string');

var _highlight_html = require('../../core_plugins/kibana/common/highlight/highlight_html');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const types = {
  html: function html(format, convert) {
    function recurse(value, field, hit, meta) {
      if (value == null) {
        return (0, _as_pretty_string.asPrettyString)(value);
      }

      if (!value || typeof value.map !== 'function') {
        return convert.call(format, value, field, hit, meta);
      }

      const subVals = value.map(v => {
        return recurse(v, field, hit, meta);
      });
      const useMultiLine = subVals.some(sub => {
        return sub.indexOf('\n') > -1;
      });

      return subVals.join(',' + (useMultiLine ? '\n' : ' '));
    }

    return function (...args) {
      return `<span ng-non-bindable>${recurse(...args)}</span>`;
    };
  },

  text: function text(format, convert) {
    return function recurse(value) {
      if (!value || typeof value.map !== 'function') {
        return convert.call(format, value);
      }

      // format a list of values. In text contexts we just use JSON encoding
      return JSON.stringify(value.map(recurse));
    };
  }
};

function fallbackText(value) {
  return (0, _as_pretty_string.asPrettyString)(value);
}

function fallbackHtml(value, field, hit) {
  const formatted = _lodash2.default.escape(this.convert(value, 'text'));

  if (!hit || !hit.highlight || !hit.highlight[field.name]) {
    return formatted;
  } else {
    return (0, _highlight_html.getHighlightHtml)(formatted, hit.highlight[field.name]);
  }
}

function contentTypesSetup(format) {
  const src = format._convert || {};
  const converters = format._convert = {};

  converters.text = types.text(format, src.text || fallbackText);
  converters.html = types.html(format, src.html || fallbackHtml);

  return format._convert;
}
