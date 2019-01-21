'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiToast = exports.COLORS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _text = require('../text');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var colorToClassNameMap = {
  primary: 'euiToast--primary',
  success: 'euiToast--success',
  warning: 'euiToast--warning',
  danger: 'euiToast--danger'
};

var COLORS = exports.COLORS = Object.keys(colorToClassNameMap);

var EuiToast = function EuiToast(_ref) {
  var title = _ref.title,
      color = _ref.color,
      iconType = _ref.iconType,
      onClose = _ref.onClose,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['title', 'color', 'iconType', 'onClose', 'children', 'className']);

  var classes = (0, _classnames2.default)('euiToast', colorToClassNameMap[color], className);
  var headerClasses = (0, _classnames2.default)('euiToastHeader', {
    'euiToastHeader--withBody': children
  });

  var headerIcon = void 0;

  if (iconType) {
    headerIcon = _react2.default.createElement(_icon.EuiIcon, {
      className: 'euiToastHeader__icon',
      type: iconType,
      size: 'm',
      'aria-hidden': 'true'
    });
  }

  var closeButton = void 0;

  if (onClose) {
    closeButton = _react2.default.createElement(
      'button',
      {
        type: 'button',
        className: 'euiToast__closeButton',
        'aria-label': 'Dismiss toast',
        onClick: onClose,
        'data-test-subj': 'toastCloseButton'
      },
      _react2.default.createElement(_icon.EuiIcon, {
        type: 'cross',
        size: 'm',
        'aria-hidden': 'true'
      })
    );
  }

  var optionalBody = void 0;

  if (children) {
    optionalBody = _react2.default.createElement(
      _text.EuiText,
      { size: 's' },
      children
    );
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(
      'div',
      { className: headerClasses },
      headerIcon,
      _react2.default.createElement(
        'span',
        { className: 'euiToastHeader__title' },
        title
      )
    ),
    closeButton,
    optionalBody
  );
};

exports.EuiToast = EuiToast;
EuiToast.propTypes = {
  title: _propTypes2.default.node,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  color: _propTypes2.default.oneOf(COLORS),
  onClose: _propTypes2.default.func,
  children: _propTypes2.default.node
};