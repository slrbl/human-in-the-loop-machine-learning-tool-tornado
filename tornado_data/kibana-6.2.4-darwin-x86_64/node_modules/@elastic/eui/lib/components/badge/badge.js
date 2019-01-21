'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiBadge = exports.ICON_SIDES = exports.COLORS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var colorToClassNameMap = {
  default: 'euiBadge--default',
  primary: 'euiBadge--primary',
  secondary: 'euiBadge--secondary',
  accent: 'euiBadge--accent',
  warning: 'euiBadge--warning',
  danger: 'euiBadge--danger'
};

var COLORS = exports.COLORS = Object.keys(colorToClassNameMap);

var iconSideToClassNameMap = {
  left: '',
  right: 'euiBadge--iconRight'
};

var ICON_SIDES = exports.ICON_SIDES = Object.keys(iconSideToClassNameMap);

var EuiBadge = function EuiBadge(_ref) {
  var children = _ref.children,
      color = _ref.color,
      iconType = _ref.iconType,
      iconSide = _ref.iconSide,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['children', 'color', 'iconType', 'iconSide', 'className']);

  var classes = (0, _classnames2.default)('euiBadge', colorToClassNameMap[color], iconSideToClassNameMap[iconSide], className);

  var optionalIcon = null;
  if (iconType) {
    optionalIcon = _react2.default.createElement(_icon.EuiIcon, { type: iconType, size: 'm', className: 'euiBadge__icon' });
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      'span',
      { className: 'euiBadge__content' },
      optionalIcon,
      _react2.default.createElement(
        'span',
        null,
        children
      )
    )
  );
};

exports.EuiBadge = EuiBadge;
EuiBadge.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  iconSide: _propTypes2.default.string,
  color: _propTypes2.default.string
};

EuiBadge.defaultProps = {
  color: 'default',
  iconSide: 'left'
};