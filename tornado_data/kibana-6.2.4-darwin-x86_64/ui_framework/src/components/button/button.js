'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiSubmitButton = exports.KuiLinkButton = exports.KuiButton = exports.BUTTON_TYPES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button_icon = require('./button_icon/button_icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const accessibleIconButton = (props, propName, componentName) => {
  if (props.children) {
    return;
  }

  if (props['aria-label']) {
    return;
  }

  if (props['aria-labelledby']) {
    return;
  }

  throw new Error(`${componentName} requires aria-label or aria-labelledby to be specified if it does not have children. ` + `This is because we're assuming you're creating an icon-only button, which is screen-reader-inaccessible.`);
};

const BUTTON_TYPES = ['basic', 'hollow', 'danger', 'warning', 'primary', 'secondary'];

const ICON_POSITIONS = ['left', 'right'];

const DEFAULT_ICON_POSITION = 'left';

const buttonTypeToClassNameMap = {
  basic: 'kuiButton--basic',
  hollow: 'kuiButton--hollow',
  danger: 'kuiButton--danger',
  warning: 'kuiButton--warning',
  primary: 'kuiButton--primary',
  secondary: 'kuiButton--secondary'
};

const getClassName = ({ className, buttonType, hasIcon = false }) => (0, _classnames2.default)('kuiButton', className, buttonTypeToClassNameMap[buttonType], {
  'kuiButton--iconText': hasIcon
});

const ContentWithIcon = ({ children, icon, iconPosition, isLoading }) => {
  const iconOrLoading = isLoading ? _react2.default.createElement(_button_icon.KuiButtonIcon, { type: 'loading' }) : icon;

  // We need to wrap the children so that the icon's :first-child etc. pseudo-selectors get applied
  // correctly.
  const wrappedChildren = children ? _react2.default.createElement(
    'span',
    null,
    children
  ) : undefined;

  switch (iconPosition) {
    case 'left':
      return _react2.default.createElement(
        'span',
        { className: 'kuiButton__inner' },
        iconOrLoading,
        wrappedChildren
      );

    case 'right':
      return _react2.default.createElement(
        'span',
        { className: 'kuiButton__inner' },
        wrappedChildren,
        iconOrLoading
      );
  }
};

const KuiButton = (_ref) => {
  let isLoading = _ref.isLoading;
  var _ref$iconPosition = _ref.iconPosition;

  let iconPosition = _ref$iconPosition === undefined ? DEFAULT_ICON_POSITION : _ref$iconPosition,
      className = _ref.className,
      buttonType = _ref.buttonType,
      icon = _ref.icon,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['isLoading', 'iconPosition', 'className', 'buttonType', 'icon', 'children']);

  return _react2.default.createElement(
    'button',
    _extends({
      className: getClassName({
        className,
        buttonType,
        hasIcon: icon || isLoading
      })
    }, rest),
    _react2.default.createElement(
      ContentWithIcon,
      {
        icon: icon,
        iconPosition: iconPosition,
        isLoading: isLoading
      },
      children
    )
  );
};

KuiButton.propTypes = {
  icon: _propTypes2.default.node,
  iconPosition: _propTypes2.default.oneOf(ICON_POSITIONS),
  children: _propTypes2.default.node,
  isLoading: _propTypes2.default.bool,
  buttonType: _propTypes2.default.oneOf(BUTTON_TYPES),
  className: _propTypes2.default.string,
  'aria-label': accessibleIconButton
};

const KuiLinkButton = (_ref2) => {
  let isLoading = _ref2.isLoading,
      icon = _ref2.icon;
  var _ref2$iconPosition = _ref2.iconPosition;

  let iconPosition = _ref2$iconPosition === undefined ? DEFAULT_ICON_POSITION : _ref2$iconPosition,
      className = _ref2.className,
      disabled = _ref2.disabled,
      buttonType = _ref2.buttonType,
      children = _ref2.children,
      rest = _objectWithoutProperties(_ref2, ['isLoading', 'icon', 'iconPosition', 'className', 'disabled', 'buttonType', 'children']);

  const onClick = e => {
    if (disabled) {
      e.preventDefault();
    }
  };

  const classes = (0, _classnames2.default)(getClassName({
    className,
    buttonType,
    hasIcon: icon || isLoading
  }), { 'kuiButton-isDisabled': disabled });

  return _react2.default.createElement(
    'a',
    _extends({
      className: classes,
      onClick: onClick
    }, rest),
    _react2.default.createElement(
      ContentWithIcon,
      {
        icon: icon,
        iconPosition: iconPosition,
        isLoading: isLoading
      },
      children
    )
  );
};

KuiLinkButton.propTypes = {
  icon: _propTypes2.default.node,
  iconPosition: _propTypes2.default.oneOf(ICON_POSITIONS),
  isLoading: _propTypes2.default.bool,
  buttonType: _propTypes2.default.oneOf(BUTTON_TYPES),
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  'aria-label': accessibleIconButton
};

const KuiSubmitButton = (_ref3) => {
  let className = _ref3.className,
      buttonType = _ref3.buttonType,
      children = _ref3.children,
      rest = _objectWithoutProperties(_ref3, ['className', 'buttonType', 'children']);

  // NOTE: The `input` element is a void element and can't contain children.
  return _react2.default.createElement('input', _extends({
    type: 'submit',
    value: children,
    className: getClassName({ className, buttonType })
  }, rest));
};

KuiSubmitButton.propTypes = {
  children: _propTypes2.default.string,
  buttonType: _propTypes2.default.oneOf(BUTTON_TYPES),
  className: _propTypes2.default.string
};

exports.BUTTON_TYPES = BUTTON_TYPES;
exports.KuiButton = KuiButton;
exports.KuiLinkButton = KuiLinkButton;
exports.KuiSubmitButton = KuiSubmitButton;
