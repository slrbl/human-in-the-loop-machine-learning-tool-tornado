"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 *  Creates a reducer wrapper which, when called with a reducer, creates a new
 *  reducer that replaces the `type` value with `newType` before delegating to
 *  the wrapped reducer
 *  @param  {String} newType
 *  @return {Function}
 */
const alias = exports.alias = newType => next => (acc, spec, type, pluginSpec) => next(acc, spec, newType, pluginSpec);
