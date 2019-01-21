'use strict';

var delimiter = '…';

function truncText (input, cap) {
  var limit = Number(cap);
  if (isNaN((limit))) {
    return delimiter;
  }
  if (input.length <= limit) {
    return input;
  }
  var result = input.substr(0, limit);
  var i = result.lastIndexOf(' ');
  if (i === -1) { // assume that we'd otherwise slash a word
    return delimiter;
  }
   // truncate up to the last space
  return result.substr(0, i) + ' ' + delimiter;
}

module.exports = truncText;
