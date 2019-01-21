'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (func) {
  const functions = {};
  functions[func.name] = func;
  if (func.aliases) {
    _lodash2.default.each(func.aliases, function (alias) {
      const aliasFn = _lodash2.default.clone(func);
      aliasFn.isAlias = true;
      functions[alias] = aliasFn;
    });
  }

  return functions;
};

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
