"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = none;

// **DON'T USE THIS**
// Performing joins/math with other sets that don't match perfectly will be wrong
// Does not resample at all.
function none(dataTuples) {
  return dataTuples;
}
module.exports = exports["default"];
