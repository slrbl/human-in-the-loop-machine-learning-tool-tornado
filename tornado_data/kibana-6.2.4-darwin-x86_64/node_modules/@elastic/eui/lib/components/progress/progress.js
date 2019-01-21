'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiProgress = exports.POSITIONS = exports.COLORS = exports.SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var sizeToClassNameMap = {
  xs: 'euiProgress--xs',
  s: 'euiProgress--s',
  m: 'euiProgress--m',
  l: 'euiProgress--l'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var colorToClassNameMap = {
  primary: 'euiProgress--primary',
  secondary: 'euiProgress--secondary',
  danger: 'euiProgress--danger',
  subdued: 'euiProgress--subdued',
  accent: 'euiProgress--accent'
};

var COLORS = exports.COLORS = Object.keys(colorToClassNameMap);

var positionsToClassNameMap = {
  fixed: 'euiProgress--fixed',
  absolute: 'euiProgress--absolute',
  static: ''
};

var POSITIONS = exports.POSITIONS = Object.keys(positionsToClassNameMap);

var EuiProgress = function EuiProgress(_ref) {
  var className = _ref.className,
      color = _ref.color,
      value = _ref.value,
      max = _ref.max,
      size = _ref.size,
      position = _ref.position,
      rest = _objectWithoutProperties(_ref, ['className', 'color', 'value', 'max', 'size', 'position']);

  var indeterminate = max === null;
  var classes = (0, _classnames2.default)('euiProgress', {
    'euiProgress--indeterminate': indeterminate,
    'euiProgress--native': !indeterminate
  }, sizeToClassNameMap[size], colorToClassNameMap[color], positionsToClassNameMap[position], className);

  // Because of a Firefox animation issue, indeterminate progress needs to use a <div>.
  // See https://css-tricks.com/html5-progress-element/
  if (indeterminate) {
    return _react2.default.createElement('div', _extends({ className: classes }, rest));
  }

  return _react2.default.createElement('progress', _extends({
    className: classes,
    value: value,
    max: max
  }, rest));
};

exports.EuiProgress = EuiProgress;
EuiProgress.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(SIZES),
  color: _propTypes2.default.oneOf(COLORS),
  position: _propTypes2.default.oneOf(POSITIONS),
  max: _propTypes2.default.number,
  indeterminate: _propTypes2.default.bool
};

EuiProgress.defaultProps = {
  max: null,
  size: 'm',
  color: 'secondary',
  position: 'static'
};