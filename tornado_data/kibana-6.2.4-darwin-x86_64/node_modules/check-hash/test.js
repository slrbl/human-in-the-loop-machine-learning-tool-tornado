var fs = require('fs');
var checkHash = require('./');
var buf = fs.readFileSync('./test.fixture');
var hash = '6f5902ac237024bdd0c176cb93063dc4';

checkHash.fromBuffer(buf, hash, function (err, passed, actual) {
  expect(passed, true);
  expect(typeof actual, 'string');
});

checkHash.fromFile('./test.fixture', hash, function (err, passed, actual) {
  expect(passed, true);
  expect(typeof actual, 'string');
});

function expect (actual, expectation) {
  if (actual !== expectation) {
    throw new Error('expectation not met. ' + actual + ' !== ' + expectation);
  }
  console.log('ok');
}
