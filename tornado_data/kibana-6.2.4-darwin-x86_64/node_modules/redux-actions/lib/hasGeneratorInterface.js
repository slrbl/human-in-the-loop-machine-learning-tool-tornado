'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = hasGeneratorInterface;

var _ownKeys = require('./ownKeys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function hasGeneratorInterface(handler) {
  var keys = (0, _ownKeys2.default)(handler);
  var hasOnlyInterfaceNames = keys.every(function (ownKey) {
    return ownKey === 'next' || ownKey === 'throw';
  });
  return keys.length && keys.length <= 2 && hasOnlyInterfaceNames;
}