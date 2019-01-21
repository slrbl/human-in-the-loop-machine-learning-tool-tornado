'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = repositionArguments;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Applies to unresolved arguments in the AST
function repositionArguments(functionDef, unorderedArgs) {
  const args = [];

  _lodash2.default.each(unorderedArgs, function (unorderedArg, i) {
    let argDef;
    let targetIndex;
    let value;
    let storeAsArray;

    if (_lodash2.default.isObject(unorderedArg) && unorderedArg.type === 'namedArg') {
      argDef = functionDef.argsByName[unorderedArg.name];

      if (!argDef) {
        if (functionDef.extended) {
          const namesIndex = functionDef.args.length;
          targetIndex = functionDef.args.length + 1;

          args[namesIndex] = args[namesIndex] || [];
          args[namesIndex].push(unorderedArg.name);

          argDef = functionDef.extended;
          storeAsArray = true;
        }
      } else {
        targetIndex = _lodash2.default.findIndex(functionDef.args, function (orderedArg) {
          return unorderedArg.name === orderedArg.name;
        });
        storeAsArray = argDef.multi;
      }
      value = unorderedArg.value;
    } else {
      argDef = functionDef.args[i];
      storeAsArray = argDef.multi;
      targetIndex = i;
      value = unorderedArg;
    }

    if (!argDef) throw new Error('Unknown argument to ' + functionDef.name + ': ' + (unorderedArg.name || '#' + i));

    if (storeAsArray) {
      args[targetIndex] = args[targetIndex] || [];
      args[targetIndex].push(value);
    } else {
      args[targetIndex] = value;
    }
  });

  return args;
}
module.exports = exports['default'];
