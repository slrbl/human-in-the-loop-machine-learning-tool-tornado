# `check-hash`

> ensure downloaded resources match expected hash of their contents.

# install

```
npm i -S check-hash
```

# usage

```js
var checkHash = require('check-hash');
var expectation = 'f8767c0bacc0ed516bfa22802dda573082b5bf463e5ea79a74087272ccb2d1e2'; // node v4.3.2

checkHash.fromFile('./node.exe', { hash: 'sha256', expectation: expectation }, function (err, passed, actual) {
  if (err) {
    done(err);
  } else if (!passed) {
    done(new Error('invalid hash: ' + actual));
  } else {
    // success
  }
});
```

# `fromFile(file, expectedHash, done)`

expectedHash can be either a string with hash or an object with two properties:
- `hash` hashing algorithm to use ('md5', 'sha256')
- `expected` string with expected hash

Computes a hash of the contents for the provided `file`, after reading it, and then calls `done(err, passed, actual)`.

- `err` reports any errors that occurred while reading the file or computing the hash.
- `passed` reports `true` if the hashes match, and `false` otherwise
- `actual` is the result of hashing the contents of the provided `file`

# `fromBuffer(buffer, expectedHash, done)`

expectedHash can be either a string with hash or an object with two properties:
- `hash` hashing algorithm to use ('md5', 'sha256')
- `expected` string with expected hash
 
Computes a hash of the provided `buffer`, and then calls `done(err, passed, actual)`.

- `err` reports any errors that occurred while computing the hash.
- `passed` reports `true` if the hashes match, and `false` otherwise
- `actual` is the result of hashing the contents of the provided `buffer`

# license

mit
