'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiCallOut = exports.SIZES = exports.COLORS = undefined;

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
  primary: 'euiCallOut--primary',
  success: 'euiCallOut--success',
  warning: 'euiCallOut--warning',
  danger: 'euiCallOut--danger'
};

var COLORS = exports.COLORS = Object.keys(colorToClassNameMap);

var sizeToClassNameMap = {
  s: 'euiCallOut--small',
  m: ''
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var EuiCallOut = function EuiCallOut(_ref) {
  var title = _ref.title,
      color = _ref.color,
      size = _ref.size,
      iconType = _ref.iconType,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['title', 'color', 'size', 'iconType', 'children', 'className']);

  var classes = (0, _classnames2.default)('euiCallOut', colorToClassNameMap[color], sizeToClassNameMap[size], className);

  var headerIcon = void 0;

  if (iconType) {
    headerIcon = _react2.default.createElement(_icon.EuiIcon, {
      className: 'euiCallOutHeader__icon',
      type: iconType,
      size: 'm',
      'aria-hidden': 'true'
    });
  }

  var optionalChildren = void 0;
  if (children && size === 's') {
    optionalChildren = _react2.default.createElement(
      _text.EuiText,
      { size: 'xs' },
      children
    );
  } else if (children) {
    optionalChildren = _react2.default.createElement(
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
      { className: 'euiCallOutHeader' },
      headerIcon,
      _react2.default.createElement(
        'span',
        { className: 'euiCallOutHeader__title' },
        title
      )
    ),
    optionalChildren
  );
};

exports.EuiCallOut = EuiCallOut;
EuiCallOut.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  title: _propTypes2.default.node,
  iconType: _propTypes2.default.oneOf(_icon.ICON_TYPES),
  color: _propTypes2.default.oneOf(COLORS),
  size: _propTypes2.default.oneOf(SIZES)
};

EuiCallOut.defaultProps = {
  color: 'primary',
  size: 'm'
};