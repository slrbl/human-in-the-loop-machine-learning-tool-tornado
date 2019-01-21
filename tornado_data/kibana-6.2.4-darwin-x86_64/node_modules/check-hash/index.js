'use strict';

var fs = require('fs');
var crypto = require('crypto');

function fromFile(file, expected, done) {
  fs.readFile(file, afterRead);
  function afterRead(err, data) {
    if (err) {
      done(err, false, null);
      return;
    }
    fromBuffer(data, expected, done);
  }
}

function fromBuffer (buffer, expected, done) {
  var hash = expected.hash || 'md5';
  expected = expected.expected || expected;
  var actual = crypto.createHash(hash).update(buffer).digest('hex');
  if (actual !== expected) {
    done(null, false, actual);
    return;
  }
  done(null, true, actual);
}

module.exports = {
  fromFile: fromFile,
  fromBuffer: fromBuffer
};
