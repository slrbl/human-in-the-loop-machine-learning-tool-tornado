'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = preProcessChainFn;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function preProcessChainFn(tlConfig) {
  return function preProcessChain(chain, queries) {
    queries = queries || {};
    function validateAndStore(item) {
      if (_lodash2.default.isObject(item) && item.type === 'function') {
        const functionDef = tlConfig.server.plugins.timelion.getFunction(item.function);

        if (functionDef.datasource) {
          queries[functionDef.cacheKey(item)] = item;
          return true;
        }
        return false;
      }
    }

    // Is this thing a function?
    if (validateAndStore(chain)) {
      return;
    }

    if (!Array.isArray(chain)) return;

    _lodash2.default.each(chain, function (operator) {
      if (!_lodash2.default.isObject(operator)) {
        return;
      }
      switch (operator.type) {
        case 'chain':
          preProcessChain(operator.chain, queries);
          break;
        case 'chainList':
          preProcessChain(operator.list, queries);
          break;
        case 'function':
          if (validateAndStore(operator)) {
            break;
          } else {
            preProcessChain(operator.arguments, queries);
          }
          break;
      }
    });

    return queries;
  };
}
module.exports = exports['default'];
