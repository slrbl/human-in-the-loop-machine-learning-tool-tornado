'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.translations = undefined;

var _reduce = require('./reduce');

var _modify_reduce = require('./modify_reduce');

// paths to translation files
const translations = exports.translations = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('translationPaths'), _reduce.flatConcatAtType);
