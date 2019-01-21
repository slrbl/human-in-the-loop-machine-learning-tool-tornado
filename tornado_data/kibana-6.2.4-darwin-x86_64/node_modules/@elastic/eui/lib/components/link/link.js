'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiLink = exports.COLORS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var colorsToClassNameMap = {
  'primary': 'euiLink--primary',
  'subdued': 'euiLink--subdued',
  'secondary': 'euiLink--secondary',
  'accent': 'euiLink--accent',
  'danger': 'euiLink--danger',
  'warning': 'euiLink--warning',
  'ghost': 'euiLink--ghost'
};

var COLORS = exports.COLORS = Object.keys(colorsToClassNameMap);

var EuiLink = function EuiLink(_ref) {
  var children = _ref.children,
      type = _ref.type,
      color = _ref.color,
      className = _ref.className,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ['children', 'type', 'color', 'className', 'onClick']);

  var classes = (0, _classnames2.default)('euiLink', colorsToClassNameMap[color], className);

  var link = void 0;
  if (onClick) {
    link = _react2.default.createElement(
      'button',
      _extends({
        type: type,
        className: classes,
        onClick: onClick
      }, rest),
      children
    );
  } else {
    link = _react2.default.createElement(
      'a',
      _extends({
        className: classes
      }, rest),
      children
    );
  }
  return link;
};

exports.EuiLink = EuiLink;
EuiLink.defaultProps = {
  color: 'primary',
  type: 'button'
};