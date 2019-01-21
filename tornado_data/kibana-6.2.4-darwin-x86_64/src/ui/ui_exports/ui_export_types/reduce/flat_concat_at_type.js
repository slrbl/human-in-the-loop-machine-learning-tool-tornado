'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatConcatAtType = undefined;

var _lib = require('./lib');

/**
 *  Reducer that merges two values concatenating all values
 *  into a flattened array
 *  @param  {Any} [initial]
 *  @return {Function}
 */
const flatConcatAtType = exports.flatConcatAtType = (0, _lib.createTypeReducer)(_lib.flatConcat);
