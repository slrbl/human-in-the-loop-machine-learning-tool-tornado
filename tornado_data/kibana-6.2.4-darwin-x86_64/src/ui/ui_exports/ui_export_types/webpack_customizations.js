'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.noParse = exports.__bundleProvider__ = exports.__globalImportAliases__ = undefined;

var _path = require('path');

var _lodash = require('lodash');

var _reduce = require('./reduce');

var _modify_reduce = require('./modify_reduce');

const __globalImportAliases__ = exports.__globalImportAliases__ = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('webpackAliases'), (0, _modify_reduce.uniqueKeys)('__globalImportAliases__'), _reduce.mergeAtType);
const __bundleProvider__ = exports.__bundleProvider__ = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('uiBundleProviders'), _reduce.flatConcatAtType);
const noParse = exports.noParse = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('webpackNoParseRules'), (0, _modify_reduce.mapSpec)(rule => {
  if (typeof rule === 'string') {
    return new RegExp(`${(0, _path.isAbsolute)(rule) ? '^' : ''}${(0, _lodash.escapeRegExp)(rule)}`);
  }

  if (rule instanceof RegExp) {
    return rule;
  }

  throw new Error('Expected noParse rule to be a string or regexp');
}), _reduce.flatConcatAtType);
