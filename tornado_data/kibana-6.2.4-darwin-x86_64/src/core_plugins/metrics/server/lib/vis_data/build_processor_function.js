"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = buildProcessorFunction;
function buildProcessorFunction(chain, ...args) {
  return chain.reduceRight((next, fn) => {
    return fn(...args)(next);
  }, doc => doc);
}
module.exports = exports["default"];
