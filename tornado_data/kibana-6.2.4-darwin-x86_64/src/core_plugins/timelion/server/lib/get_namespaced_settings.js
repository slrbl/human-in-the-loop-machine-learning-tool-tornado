'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  function flattenWith(dot, nestedObj, flattenArrays) {
    const stack = []; // track key stack
    const flatObj = {};
    (function flattenObj(obj) {
      _lodash2.default.keys(obj).forEach(function (key) {
        stack.push(key);
        if (!flattenArrays && Array.isArray(obj[key])) flatObj[stack.join(dot)] = obj[key];else if (_lodash2.default.isObject(obj[key])) flattenObj(obj[key]);else flatObj[stack.join(dot)] = obj[key];
        stack.pop();
      });
    })(nestedObj);
    return flatObj;
  }

  const timelionDefaults = flattenWith('.', _timelion2.default);
  return _lodash2.default.reduce(timelionDefaults, (result, value, key) => {
    result['timelion:' + key] = value;
    return result;
  }, {});
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _timelion = require('../../timelion.json');

var _timelion2 = _interopRequireDefault(_timelion);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
