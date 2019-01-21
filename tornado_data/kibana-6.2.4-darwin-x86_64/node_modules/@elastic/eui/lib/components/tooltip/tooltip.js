'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Tooltip = exports.SIZES = undefined;

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
  auto: null,
  s: 'euiTooltip--small',
  m: 'euiTooltip--medium',
  l: 'euiTooltip--large'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var Tooltip = function Tooltip(_ref) {
  var children = _ref.children,
      className = _ref.className,
      size = _ref.size,
      isVisible = _ref.isVisible,
      isSticky = _ref.isSticky,
      title = _ref.title,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'size', 'isVisible', 'isSticky', 'title']);

  var classes = (0, _classnames2.default)('euiTooltip__container', sizeToClassNameMap[size], {
    'euiTooltip-isVisible': isVisible,
    'euiTooltip-isHidden': !isVisible,
    'euiTooltip-isSticky': isSticky
  }, className);

  var tooltipTitle = void 0;
  if (title) {
    tooltipTitle = _react2.default.createElement(
      'div',
      { className: 'euiTooltip__title' },
      title
    );
  }

  return _react2.default.createElement(
    'div',
    _extends({ className: classes }, rest),
    _react2.default.createElement(
      'div',
      { className: 'euiTooltip__content' },
      tooltipTitle,
      children
    )
  );
};

exports.Tooltip = Tooltip;
Tooltip.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  size: _propTypes2.default.oneOf(SIZES),
  isVisible: _propTypes2.default.bool,
  isSticky: _propTypes2.default.bool,
  title: _propTypes2.default.string
};

Tooltip.defaultProps = {
  size: 'auto',
  isVisible: true,
  isSticky: false
};