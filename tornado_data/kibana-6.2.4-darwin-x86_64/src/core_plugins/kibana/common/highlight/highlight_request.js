'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getHighlightRequest = getHighlightRequest;

var _highlight_tags = require('./highlight_tags');

const FRAGMENT_SIZE = Math.pow(2, 31) - 1; // Max allowed value for fragment_size (limit of a java int)

function getHighlightRequest(query, getConfig) {
  if (!getConfig('doc_table:highlight')) return;

  return {
    pre_tags: [_highlight_tags.highlightTags.pre],
    post_tags: [_highlight_tags.highlightTags.post],
    fields: {
      '*': {}
    },
    fragment_size: FRAGMENT_SIZE
  };
}
