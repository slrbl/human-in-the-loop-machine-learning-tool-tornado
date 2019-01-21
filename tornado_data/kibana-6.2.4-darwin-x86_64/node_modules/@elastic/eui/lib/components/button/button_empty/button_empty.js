'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiButtonEmpty = exports.FLUSH_TYPES = exports.ICON_SIDES = exports.SIZES = exports.COLORS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _check_href_and_onclick = require('../../../services/prop_types/check_href_and_onclick');

var _check_href_and_onclick2 = _interopRequireDefault(_check_href_and_onclick);

var _icon = require('../../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var colorToClassNameMap = {
  primary: 'euiButtonEmpty--primary',
  danger: 'euiButtonEmpty--danger',
  disabled: 'euiButtonEmpty--disabled',
  text: 'euiButtonEmpty--text',
  ghost: 'euiButtonEmpty--ghost'
};

var COLORS = exports.COLORS = Object.keys(colorToClassNameMap);

var sizeToClassNameMap = {
  xs: 'euiButtonEmpty--xSmall',
  s: 'euiButtonEmpty--small',
  l: 'euiButtonEmpty--large'
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var iconSideToClassNameMap = {
  left: '',
  right: 'euiButtonEmpty--iconRight'
};

var ICON_SIDES = exports.ICON_SIDES = Object.keys(iconSideToClassNameMap);

var flushTypeToClassNameMap = {
  'left': 'euiButtonEmpty--flushLeft',
  'right': 'euiButtonEmpty--flushRight'
};

var FLUSH_TYPES = exports.FLUSH_TYPES = Object.keys(flushTypeToClassNameMap);

var EuiButtonEmpty = function EuiButtonEmpty(_ref) {
  var children = _ref.children,
      className = _ref.className,
      iconType = _ref.iconType,
      iconSide = _ref.iconSide,
      color = _ref.color,
      size = _ref.size,
      flush = _ref.flush,
      isDisabled = _ref.isDisabled,
      href = _ref.href,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'iconType', 'iconSide', 'color', 'size', 'flush', 'isDisabled', 'href', 'onClick']);

  var classes = (0, _classnames2.default)('euiButtonEmpty', colorToClassNameMap[color], sizeToClassNameMap[size], iconSideToClassNameMap[iconSide], flushTypeToClassNameMap[flush], className);

  // Add an icon to the button if one exists.
  var buttonIcon = void 0;

  if (iconType) {
    buttonIcon = _react2.default.createElement(_icon.EuiIcon, {
      className: 'euiButtonEmpty__icon',
      type: iconType,
      size: 'm',
      'aria-hidden': 'true'
    });
  }

  if (href) {
    return _react2.default.createElement(
      'a',
      _extends({
        className: classes,
        href: href
      }, rest),
      _react2.default.createElement(
        'span',
        { className: 'euiButtonEmpty__content' },
        buttonIcon,
        _react2.default.createElement(
          'span',
          null,
          children
        )
      )
    );
  } else {
    return _react2.default.createElement(
      'button',
      _extends({
        disabled: isDisabled,
        className: classes,
        onClick: onClick
      }, rest),
      _react2.default.createElement(
        'span',
        { className: 'euiButtonEmpty__content' },
        buttonIcon,
        _react2.default.createElement(
          'span',
          null,
          children
        )
      )
    );
  }
};

exports.EuiButtonEmpty = EuiButtonEmpty;
EuiButtonEmpty.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  iconSide: _propTypes2.default.oneOf(ICON_SIDES),
  color: _propTypes2.default.oneOf(COLORS),
  size: _propTypes2.default.oneOf(SIZES),
  flush: _propTypes2.default.oneOf(FLUSH_TYPES),
  isDisabled: _propTypes2.default.bool,
  href: _check_href_and_onclick2.default,
  onClick: _propTypes2.default.func
};

EuiButtonEmpty.defaultProps = {
  type: 'button',
  iconSide: 'left',
  color: 'primary'
};