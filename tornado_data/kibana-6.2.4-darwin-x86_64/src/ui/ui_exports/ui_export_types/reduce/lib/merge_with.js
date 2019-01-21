"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeWith = mergeWith;
const uniqueConcat = (arrayA, arrayB) => arrayB.reduce((acc, key) => acc.includes(key) ? acc : acc.concat(key), arrayA);

/**
 * Assign the keys from both objA and objB to target after passing the
 * current and new value through merge as `(target[key], source[key])`
 * @param  {Object} objA
 * @param  {Object} objB
 * @param  {Function} merge
 * @return {Object} target
 */
function mergeWith(objA, objB, merge) {
  const target = {};
  const keys = uniqueConcat(Object.keys(objA), Object.keys(objB));
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = keys[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      const key = _step.value;

      target[key] = merge(objA[key], objB[key]);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return target;
}
