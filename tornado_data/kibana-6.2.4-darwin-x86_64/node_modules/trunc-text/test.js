var test = require('ava');
var trunc = require('./');
var sw = 'the force is strong with this one. some more rubbish';

test(t => {
  t.same(trunc(sw, 0), '…');
});

test(t => {
  t.same(trunc(sw, 30), 'the force is strong with this …');
  t.same(trunc(sw, 31), 'the force is strong with this …');
  t.same(trunc(sw, 32), 'the force is strong with this …');
  t.same(trunc(sw, 33), 'the force is strong with this …');
  t.same(trunc(sw, 34), 'the force is strong with this …');
});

test(t => {
  t.same(trunc(sw, 35), 'the force is strong with this one. …');
});

test(t => {
  t.same(trunc('asd ', 3), '…');
});

test(`length is 4, returns as-is, 'asd …' would be a bug because cap is len 4`, t => {
  t.same(trunc('asd ', 4), 'asd ');
});

test(t => {
  t.same(trunc(sw, NaN), '…');
});

test(t => {
  t.same(trunc(sw, 'lol'), '…');
});
