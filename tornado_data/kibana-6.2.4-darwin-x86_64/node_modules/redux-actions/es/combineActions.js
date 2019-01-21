import isString from 'lodash-es/isString';
import isFunction from 'lodash-es/isFunction';
import isEmpty from 'lodash-es/isEmpty';
import toString from 'lodash-es/toString';
import isSymbol from 'lodash-es/isSymbol';
import invariant from 'invariant';

export var ACTION_TYPE_DELIMITER = '||';

function isValidActionType(type) {
  return isString(type) || isFunction(type) || isSymbol(type);
}

function isValidActionTypes(types) {
  if (isEmpty(types)) {
    return false;
  }
  return types.every(isValidActionType);
}

export default function combineActions() {
  for (var _len = arguments.length, actionsTypes = Array(_len), _key = 0; _key < _len; _key++) {
    actionsTypes[_key] = arguments[_key];
  }

  invariant(isValidActionTypes(actionsTypes), 'Expected action types to be strings, symbols, or action creators');
  var combinedActionType = actionsTypes.map(toString).join(ACTION_TYPE_DELIMITER);
  return { toString: function toString() {
      return combinedActionType;
    } };
}