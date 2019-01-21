'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = carry;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Upsampling of non-cummulative sets
// Good: average, min, max
// Bad: sum, count

// Don't use this to down sample, it simply won't do the right thing.
function carry(dataTuples, targetTuples) {

  if (dataTuples.length > targetTuples.length) {
    throw new Error(`Don't use the 'carry' fit method to down sample, use 'scale' or 'average'`);
  }

  let currentCarry = dataTuples[0][1];
  return _lodash2.default.map(targetTuples, function (bucket) {
    const targetTime = bucket[0];
    const dataTime = dataTuples[0][0];

    if (dataTuples[0] && targetTime >= dataTime) {
      currentCarry = dataTuples[0][1];
      if (dataTuples.length > 1) {
        dataTuples.shift();
      }
    }

    return [bucket[0], currentCarry];
  });
}
module.exports = exports['default'];
