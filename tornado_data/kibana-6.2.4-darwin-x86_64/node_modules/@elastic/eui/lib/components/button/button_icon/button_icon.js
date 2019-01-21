'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiButtonIcon = exports.COLORS = undefined;

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

var accessibleButtonIcon = function accessibleButtonIcon(props, propName, componentName) {
  if (props['aria-label']) {
    return;
  }

  if (props['aria-labelledby']) {
    return;
  }

  throw new Error(componentName + ' requires aria-label or aria-labelledby to be specified because icon-only\n    buttons are screen-reader-inaccessible without them.');
};

var colorToClassNameMap = {
  primary: 'euiButtonIcon--primary',
  danger: 'euiButtonIcon--danger',
  disabled: 'euiButtonIcon--disabled',
  ghost: 'euiButtonIcon--ghost',
  text: 'euiButtonIcon--text'
};

var COLORS = exports.COLORS = Object.keys(colorToClassNameMap);

var EuiButtonIcon = function EuiButtonIcon(_ref) {
  var className = _ref.className,
      iconType = _ref.iconType,
      color = _ref.color,
      isDisabled = _ref.isDisabled,
      href = _ref.href,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ['className', 'iconType', 'color', 'isDisabled', 'href', 'onClick']);

  var classes = (0, _classnames2.default)('euiButtonIcon', colorToClassNameMap[color], className);

  // Add an icon to the button if one exists.
  var buttonIcon = void 0;

  if (iconType) {
    buttonIcon = _react2.default.createElement(_icon.EuiIcon, {
      className: 'euiButtonIcon__icon',
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
      buttonIcon
    );
  } else {
    return _react2.default.createElement(
      'button',
      _extends({
        disabled: isDisabled,
        className: classes,
        onClick: onClick
      }, rest),
      buttonIcon
    );
  }
};

exports.EuiButtonIcon = EuiButtonIcon;
EuiButtonIcon.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  color: _propTypes2.default.oneOf(COLORS),
  isDisabled: _propTypes2.default.bool,
  'aria-label': accessibleButtonIcon,
  href: _check_href_and_onclick2.default,
  onClick: _propTypes2.default.func
};

EuiButtonIcon.defaultProps = {
  type: 'button',
  color: 'primary'
};