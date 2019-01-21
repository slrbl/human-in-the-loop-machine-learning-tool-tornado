'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPacksInDirectory$ = undefined;

var _errors = require('../errors');

var _lib = require('./lib');

var _pack_at_path = require('./pack_at_path');

/**
 *  Finds the plugins within a directory. Results are
 *  an array of objects with either `pack` or `error`
 *  keys.
 *
 *   - `{ error }` results are provided when the path is not
 *     a directory, or one of the child directories is not a
 *     valid plugin pack.
 *   - `{ pack }` results are for discovered plugins defs
 *
 *  @param  {String} path
 *  @return {Array<{pack}|{error}>}
 */
const createPacksInDirectory$ = exports.createPacksInDirectory$ = path => (0, _lib.createChildDirectory$)(path).mergeMap(_pack_at_path.createPackAtPath$).catch(error => {
  // this error is produced by createChildDirectory$() when the path
  // is invalid, we return them as an error result similar to how
  // createPackAtPath$ works when it finds invalid packs in a directory
  if ((0, _errors.isInvalidDirectoryError)(error)) {
    return [{ error }];
  }

  throw error;
});
