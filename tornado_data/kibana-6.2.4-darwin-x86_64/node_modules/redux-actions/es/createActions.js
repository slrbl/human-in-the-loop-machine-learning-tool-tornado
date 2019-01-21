var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

import camelCase from './camelCase';
import identity from 'lodash-es/identity';
import isPlainObject from 'lodash-es/isPlainObject';
import isArray from 'lodash-es/isArray';
import last from 'lodash-es/last';
import isString from 'lodash-es/isString';
import isFunction from 'lodash-es/isFunction';
import isNil from 'lodash-es/isNil';
import createAction from './createAction';
import invariant from 'invariant';
import arrayToObject from './arrayToObject';
import { flattenActionMap, unflattenActionCreators } from './flattenUtils';

export default function createActions(actionMap) {
  for (var _len = arguments.length, identityActions = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    identityActions[_key - 1] = arguments[_key];
  }

  var _ref = isPlainObject(last(identityActions)) ? identityActions.pop() : {};

  var namespace = _ref.namespace;

  invariant(identityActions.every(isString) && (isString(actionMap) || isPlainObject(actionMap)), 'Expected optional object followed by string action types');
  if (isString(actionMap)) {
    return actionCreatorsFromIdentityActions([actionMap].concat(identityActions));
  }
  return _extends({}, actionCreatorsFromActionMap(actionMap, namespace), actionCreatorsFromIdentityActions(identityActions));
}

function actionCreatorsFromActionMap(actionMap, namespace) {
  var flatActionMap = flattenActionMap(actionMap, namespace);
  var flatActionCreators = actionMapToActionCreators(flatActionMap);
  return unflattenActionCreators(flatActionCreators, namespace);
}

function actionMapToActionCreators(actionMap) {
  function isValidActionMapValue(actionMapValue) {
    if (isFunction(actionMapValue) || isNil(actionMapValue)) {
      return true;
    } else if (isArray(actionMapValue)) {
      var _actionMapValue = _slicedToArray(actionMapValue, 2);

      var _actionMapValue$ = _actionMapValue[0];
      var payload = _actionMapValue$ === undefined ? identity : _actionMapValue$;
      var meta = _actionMapValue[1];

      return isFunction(payload) && isFunction(meta);
    }
    return false;
  }

  return arrayToObject(Object.keys(actionMap), function (partialActionCreators, type) {
    var actionMapValue = actionMap[type];
    invariant(isValidActionMapValue(actionMapValue), 'Expected function, undefined, null, or array with payload and meta ' + ('functions for ' + type));
    var actionCreator = isArray(actionMapValue) ? createAction.apply(undefined, [type].concat(_toConsumableArray(actionMapValue))) : createAction(type, actionMapValue);
    return _extends({}, partialActionCreators, _defineProperty({}, type, actionCreator));
  });
}

function actionCreatorsFromIdentityActions(identityActions) {
  var actionMap = arrayToObject(identityActions, function (partialActionMap, type) {
    return _extends({}, partialActionMap, _defineProperty({}, type, identity));
  });
  var actionCreators = actionMapToActionCreators(actionMap);
  return arrayToObject(Object.keys(actionCreators), function (partialActionCreators, type) {
    return _extends({}, partialActionCreators, _defineProperty({}, camelCase(type), actionCreators[type]));
  });
}