'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiText = exports.TEXT_SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _text_color = require('./text_color');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var textSizeToClassNameMap = {
  s: 'euiText--small',
  xs: 'euiText--extraSmall'
};

var TEXT_SIZES = exports.TEXT_SIZES = Object.keys(textSizeToClassNameMap);

var EuiText = function EuiText(_ref) {
  var size = _ref.size,
      color = _ref.color,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['size', 'color', 'children', 'className']);

  var classes = (0, _classnames2.default)('euiText', textSizeToClassNameMap[size], className);

  var optionallyColoredText = void 0;
  if (color) {
    optionallyColoredText = _react2.default.createElement(
      _text_color.EuiTextColor,
      { color: color },
      children
    );
  } else {
    optionallyColoredText = children;
  }

  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    optionallyColoredText
  );
};

exports.EuiText = EuiText;
EuiText.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(TEXT_SIZES),
  color: _propTypes2.default.oneOf(_text_color.COLORS)
};