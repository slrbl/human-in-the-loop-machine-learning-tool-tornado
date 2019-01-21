'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createMapStream = createMapStream;

var _stream = require('stream');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function createMapStream(fn) {
  let i = 0;

  return new _stream.Transform({
    objectMode: true,
    transform(value, enc, done) {
      var _this = this;

      return _asyncToGenerator(function* () {
        try {
          _this.push((yield fn(value, i++)));
          done();
        } catch (err) {
          done(err);
        }
      })();
    }
  });
}
