"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Concatenate two values into a single array, ignoring either
 * value if it is undefined and flattening the value if it is an array
 * @param  {Array<T>|T} a
 * @param  {Array<T>} b
 * @return {Array<T>}
 */
const flatConcat = exports.flatConcat = (a, b) => [].concat(a === undefined ? [] : a, b === undefined ? [] : b);
