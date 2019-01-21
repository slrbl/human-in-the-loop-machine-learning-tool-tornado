'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiBottomBar = exports.PADDING_SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var paddingSizeToClassNameMap = {
  none: null,
  s: 'euiBottomBar--paddingSmall',
  m: 'euiBottomBar--paddingMedium',
  l: 'euiBottomBar--paddingLarge'
};

var PADDING_SIZES = exports.PADDING_SIZES = Object.keys(paddingSizeToClassNameMap);

var EuiBottomBar = function EuiBottomBar(_ref) {
  var children = _ref.children,
      className = _ref.className,
      paddingSize = _ref.paddingSize,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'paddingSize']);

  var classes = (0, _classnames2.default)('euiBottomBar', paddingSizeToClassNameMap[paddingSize], className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.EuiBottomBar = EuiBottomBar;
EuiBottomBar.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  paddingSize: _propTypes2.default.oneOf(PADDING_SIZES)
};

EuiBottomBar.defaultProps = {
  paddingSize: 'm'
};