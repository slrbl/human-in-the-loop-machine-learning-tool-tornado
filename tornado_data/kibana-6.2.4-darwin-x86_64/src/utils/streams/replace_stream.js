'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReplaceStream = createReplaceStream;

var _stream = require('stream');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function createReplaceStream(toReplace, replacement) {
  if (typeof toReplace !== 'string') {
    throw new TypeError('toReplace must be a string');
  }

  let buffer = Buffer.alloc(0);
  return new _stream.Transform({
    objectMode: false,
    transform(value, enc, done) {
      var _this = this;

      return _asyncToGenerator(function* () {
        try {
          buffer = Buffer.concat([buffer, value], buffer.length + value.length);

          while (true) {
            // try to find the next instance of `toReplace` in buffer
            const index = buffer.indexOf(toReplace);

            // if there is no next instance, break
            if (index === -1) {
              break;
            }

            // flush everything to the left of the next instance
            // of `toReplace`
            _this.push(buffer.slice(0, index));

            // then flush an instance of `replacement`
            _this.push(replacement);

            // and finally update the buffer to include everything
            // to the right of `toReplace`, dropping to replace from the buffer
            buffer = buffer.slice(index + toReplace.length);
          }

          // until now we have only flushed data that is to the left
          // of a discovered instance of `toReplace`. If `toReplace` is
          // never found this would lead to us buffering the entire stream.
          //
          // Instead, we only keep enough buffer to complete a potentially
          // patial instance of `toReplace`
          if (buffer.length > toReplace.length) {
            // the entire buffer except the last `toReplace.length` bytes
            // so that if all but one byte from `toReplace` is in the buffer,
            // and the next chunk delivers the necessary byte, the buffer will then
            // contain a complete `toReplace` token.
            _this.push(buffer.slice(0, buffer.length - toReplace.length));
            buffer = buffer.slice(-toReplace.length);
          }

          done();
        } catch (err) {
          done(err);
        }
      })();
    },

    flush(callback) {
      if (buffer.length) {
        this.push(buffer);
      }

      buffer = null;
      callback();
    }
  });
}
