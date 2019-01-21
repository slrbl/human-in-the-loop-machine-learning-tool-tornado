'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = handleActions;

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _reduceReducers = require('reduce-reducers');

var _reduceReducers2 = _interopRequireDefault(_reduceReducers);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

var _handleAction = require('./handleAction');

var _handleAction2 = _interopRequireDefault(_handleAction);

var _ownKeys = require('./ownKeys');

var _ownKeys2 = _interopRequireDefault(_ownKeys);

var _flattenUtils = require('./flattenUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function handleActions(handlers, defaultState) {
  var _ref = arguments.length <= 2 || arguments[2] === undefined ? {} : arguments[2];

  var namespace = _ref.namespace;

  (0, _invariant2.default)((0, _isPlainObject2.default)(handlers), 'Expected handlers to be an plain object.');
  var flattenedReducerMap = (0, _flattenUtils.flattenReducerMap)(handlers, namespace);
  var reducers = (0, _ownKeys2.default)(flattenedReducerMap).map(function (type) {
    return (0, _handleAction2.default)(type, flattenedReducerMap[type], defaultState);
  });
  var reducer = _reduceReducers2.default.apply(undefined, _toConsumableArray(reducers));
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? defaultState : arguments[0];
    var action = arguments[1];
    return reducer(state, action);
  };
}