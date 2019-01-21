'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSourceFormat = createSourceFormat;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _no_white_space = require('../../utils/no_white_space');

var _aggressive_parse = require('../../utils/aggressive_parse');

var _shorten_dotted_string = require('../../utils/shorten_dotted_string');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const templateHtml = `
  <dl class="source truncate-by-height">
    <% defPairs.forEach(function (def) { %>
      <dt><%- def[0] %>:</dt>
      <dd><%= def[1] %></dd>
      <%= ' ' %>
    <% }); %>
  </dl>`;
const template = _lodash2.default.template((0, _no_white_space.noWhiteSpace)(templateHtml));

function createSourceFormat(FieldFormat) {
  class SourceFormat extends FieldFormat {
    constructor(params, getConfig) {
      super(params);

      this.getConfig = getConfig;
    }

  }

  SourceFormat.id = '_source';
  SourceFormat.title = '_source';
  SourceFormat.fieldType = '_source';
  SourceFormat.prototype._convert = {
    text: value => (0, _aggressive_parse.toJson)(value),
    html: function sourceToHtml(source, field, hit) {
      if (!field) return this.getConverterFor('text')(source, field, hit);

      const highlights = hit && hit.highlight || {};
      const formatted = field.indexPattern.formatHit(hit);
      const highlightPairs = [];
      const sourcePairs = [];

      const isShortDots = this.getConfig('shortDots:enable');
      _lodash2.default.keys(formatted).forEach(key => {
        const pairs = highlights[key] ? highlightPairs : sourcePairs;
        const field = isShortDots ? (0, _shorten_dotted_string.shortenDottedString)(key) : key;
        const val = formatted[key];
        pairs.push([field, val]);
      }, []);

      return template({ defPairs: highlightPairs.concat(sourcePairs) });
    }
  };

  return SourceFormat;
}
