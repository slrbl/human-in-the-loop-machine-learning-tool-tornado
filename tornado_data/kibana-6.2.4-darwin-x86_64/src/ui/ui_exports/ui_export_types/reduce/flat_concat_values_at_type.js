'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.flatConcatValuesAtType = undefined;

var _lib = require('./lib');

/**
 *  Reducer that merges specs by concatenating the values of
 *  all keys in accumulator and spec with the same logic as concat
 *  @param  {[type]} initial [description]
 *  @return {[type]}         [description]
 */
const flatConcatValuesAtType = exports.flatConcatValuesAtType = (0, _lib.createTypeReducer)((objectA, objectB) => (0, _lib.mergeWith)(objectA || {}, objectB || {}, _lib.flatConcat));
