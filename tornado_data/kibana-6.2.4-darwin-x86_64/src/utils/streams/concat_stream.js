'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createConcatStream = createConcatStream;

var _reduce_stream = require('./reduce_stream');

/**
 *  Creates a Transform stream that consumes all provided
 *  values and concatenates them using each values `concat`
 *  method.
 *
 *  Concatenate strings:
 *    createListStream(['f', 'o', 'o'])
 *      .pipe(createConcatStream())
 *      .on('data', console.log)
 *      // logs "foo"
 *
 *  Concatenate values into an array:
 *    createListStream([1,2,3])
 *      .pipe(createConcatStream([]))
 *      .pipe(createJsonStringifyStream())
 *      .on('data', console.log)
 *      // logs "[1,2,3]"
 *
 *
 *  @param {any} initial The initial value that subsequent
 *                       items will concat with
 *  @return {Transform}
 */
function createConcatStream(initial) {
  return (0, _reduce_stream.createReduceStream)((acc, chunk) => acc.concat(chunk), initial);
}
