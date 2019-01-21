'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = offsetTime;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// usually reverse = false on the request, true on the response
function offsetTime(milliseconds, offset, reverse) {
  if (!offset.match(/[-+][0-9]+[mshdwMy]/g)) {
    throw new Error('Malformed `offset` at ' + offset);
  }
  const parts = offset.match(/[-+]|[0-9]+|[mshdwMy]/g);

  let add = parts[0] === '+';
  add = reverse ? !add : add;

  const mode = add ? 'add' : 'subtract';

  const momentObj = (0, _moment2.default)(milliseconds)[mode](parts[1], parts[2]);
  return momentObj.valueOf();
}
module.exports = exports['default'];
