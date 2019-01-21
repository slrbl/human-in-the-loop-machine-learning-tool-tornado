'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

/**
 *  Take an array of streams, pipe the output
 *  from each one into the next, listening for
 *  errors from any of the streams, and then resolve
 *  the promise once the final stream has finished
 *  writing/reading.
 *
 *  If the last stream is readable, it's final value
 *  will be provided as the promise value.
 *
 *  Errors emmitted from any stream will cause
 *  the promise to be rejected with that error.
 *
 *  @param  {Array<Stream>} streams
 *  @return {Promise<any>}
 */
let createPromiseFromStreams = exports.createPromiseFromStreams = (() => {
  var _ref = _asyncToGenerator(function* (streams) {
    const last = streams[streams.length - 1];

    // reject if any of the streams emits an error
    const anyStreamFailure = new Promise(function (resolve, reject) {
      streams.forEach(function (stream, i) {
        if (i > 0) streams[i - 1].pipe(stream);
        stream.on('error', reject);
        return stream;
      });
    });

    // resolve when the last stream has finished writing, or
    // immediately if the last stream is not writable
    const lastFinishedWriting = new Promise(function (resolve) {
      if (typeof last.write !== 'function') {
        resolve();
        return;
      }

      last.on('finish', resolve);
    });

    // resolve with the final value provided by the last stream
    // after the last stream has provided it, or immediately if the
    // stream is not readable
    const lastFinishedReading = new Promise(function (resolve) {
      if (typeof last.read !== 'function') {
        resolve();
        return;
      }

      let finalChunk;
      last.on('data', function (chunk) {
        finalChunk = chunk;
      });
      last.on('end', function () {
        resolve(finalChunk);
      });
    });

    // wait (and rethrow) the first error, or for the last stream
    // to both finish writing and providing values to read
    yield Promise.race([anyStreamFailure, Promise.all([lastFinishedWriting, lastFinishedReading])]);

    // return the final chunk read from the last stream
    return yield lastFinishedReading;
  });

  return function createPromiseFromStreams(_x) {
    return _ref.apply(this, arguments);
  };
})();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
