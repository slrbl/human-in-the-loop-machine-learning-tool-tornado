'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = indexArguments;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Only applies to already resolved arguments
function indexArguments(functionDef, orderedArgs) {

  const validateArg = require('./validate_arg')(functionDef);

  // This almost certainly is not required
  const allowedLength = functionDef.extended ? functionDef.args.length + 2 : functionDef.args.length;
  if (orderedArgs.length > allowedLength) throw new Error('Too many arguments passed to: ' + functionDef.name);

  const indexedArgs = {};
  // Check and index each known argument
  _lodash2.default.each(functionDef.args, function (argDef, i) {
    const value = orderedArgs[i];
    validateArg(value, argDef.name, argDef);
    indexedArgs[argDef.name] = value;
  });

  // Also check and index the extended arguments if enabled
  if (functionDef.extended) {
    const values = orderedArgs[orderedArgs.length - 1];
    const names = orderedArgs[orderedArgs.length - 2];
    _lodash2.default.each(values, function (value, i) {
      validateArg(value, names[i], functionDef.extended);
      indexedArgs[names[i]] = value;
    });
  }

  return indexedArgs;
}
module.exports = exports['default'];
