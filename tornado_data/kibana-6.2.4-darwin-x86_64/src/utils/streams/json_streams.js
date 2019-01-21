'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createJsonParseStream = createJsonParseStream;
exports.createJsonStringifyStream = createJsonStringifyStream;

var _stream = require('stream');

/**
 *  Create a Transform stream that accepts strings (in
 *  object mode) and parsed those streams to provide their
 *  JavaScript value.
 *
 *  Parse errors are emitted with the "error" event, and
 *  if not caught will cause the process to crash. When caught
 *  the stream will continue to parse subsequent values.
 *
 *  @return {Transform}
 */
function createJsonParseStream() {
  return new _stream.Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(json, enc, callback) {
      try {
        callback(null, JSON.parse(json));
      } catch (err) {
        callback(err);
      }
    }
  });
}

/**
 *  Create a Transform stream that accepts arbitrary JavaScript
 *  values, stringifies them, and provides the output in object
 *  mode to consumers.
 *
 *  Serialization errors are emitted with the "error" event, and
 *  if not caught will cause the process to crash. When caught
 *  the stream will continue to stringify subsequent values.
 *
 *  @param  {Object} options
 *  @property {Boolean} options.pretty
 *  @return {Transform}
 */
function createJsonStringifyStream({ pretty = false } = {}) {
  return new _stream.Transform({
    writableObjectMode: true,
    readableObjectMode: true,
    transform(json, enc, callback) {
      try {
        callback(null, JSON.stringify(json, null, pretty ? 2 : 0));
      } catch (err) {
        callback(err);
      }
    }
  });
}
