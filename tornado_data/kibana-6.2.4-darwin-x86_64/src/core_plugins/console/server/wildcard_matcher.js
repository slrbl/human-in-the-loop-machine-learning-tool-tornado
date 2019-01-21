'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.WildcardMatcher = undefined;

var _minimatch = require('minimatch');

class WildcardMatcher {
  constructor(wildcardPattern, emptyVal) {
    this.emptyVal = emptyVal;
    this.pattern = String(wildcardPattern || '*');
    this.matcher = new _minimatch.Minimatch(this.pattern, {
      noglobstar: true,
      dot: true,
      nocase: true,
      matchBase: true,
      nocomment: true
    });
  }

  match(candidate) {
    const empty = !candidate || candidate === this.emptyVal;
    if (empty && this.pattern === '*') {
      return true;
    }

    return this.matcher.match(candidate || '');
  }
}
exports.WildcardMatcher = WildcardMatcher;
