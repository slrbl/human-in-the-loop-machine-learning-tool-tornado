"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 *  Creates a reducer that reduces the values within `acc[type]` by calling
 *  reducer with signature:
 *
 *     reducer(acc[type], spec, type, pluginSpec)
 *
 *  @param  {Function} reducer
 *  @return {Function}
 */
const createTypeReducer = exports.createTypeReducer = reducer => (acc, spec, type, pluginSpec) => _extends({}, acc, {
  [type]: reducer(acc[type], spec, type, pluginSpec)
});
