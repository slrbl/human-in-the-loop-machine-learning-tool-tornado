'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = validateArgFn;

var _arg_type = require('./arg_type');

var _arg_type2 = _interopRequireDefault(_arg_type);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateArgFn(functionDef) {
  return function validateArg(value, name, argDef) {
    const type = (0, _arg_type2.default)(value);
    const required = argDef.types;
    const multi = argDef.multi;
    const isCorrectType = function () {
      // If argument is not allow to be specified multiple times, we're dealing with a plain value for type
      if (!multi) return _lodash2.default.contains(required, type);
      // If it is, we'll get an array for type
      return _lodash2.default.difference(type, required).length === 0;
    }();

    if (isCorrectType) return true;else return false;

    if (!isCorrectType) {
      throw new Error(functionDef.name + '(' + name + ') must be one of ' + JSON.stringify(required) + '. Got: ' + type);
    }
  };
}
module.exports = exports['default'];
