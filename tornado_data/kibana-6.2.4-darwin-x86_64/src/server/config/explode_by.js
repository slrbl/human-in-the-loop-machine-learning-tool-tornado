'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (dot, flatObject) {
  const fullObject = {};
  _lodash2.default.each(flatObject, function (value, key) {
    const keys = key.split(dot);
    (function walk(memo, keys, value) {
      const _key = keys.shift();
      if (keys.length === 0) {
        memo[_key] = value;
      } else {
        if (!memo[_key]) memo[_key] = {};
        walk(memo[_key], keys, value);
      }
    })(fullObject, keys, value);
  });
  return fullObject;
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
