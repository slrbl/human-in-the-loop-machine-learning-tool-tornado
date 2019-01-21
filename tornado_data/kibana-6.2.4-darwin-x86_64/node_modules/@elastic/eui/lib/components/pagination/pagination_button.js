'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiPaginationButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _button = require('../button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiPaginationButton = function EuiPaginationButton(_ref) {
  var children = _ref.children,
      className = _ref.className,
      isActive = _ref.isActive,
      isPlaceholder = _ref.isPlaceholder,
      hideOnMobile = _ref.hideOnMobile,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'isActive', 'isPlaceholder', 'hideOnMobile']);

  var classes = (0, _classnames2.default)('euiPaginationButton', className, {
    'euiPaginationButton-isActive': isActive,
    'euiPaginationButton-isPlaceholder': isPlaceholder,
    'euiPaginationButton--hideOnMobile': hideOnMobile
  });

  return _react2.default.createElement(
    _button.EuiButtonEmpty,
    _extends({
      className: classes,
      size: 's',
      color: 'text'
    }, rest),
    children
  );
};

exports.EuiPaginationButton = EuiPaginationButton;
EuiPaginationButton.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  isActive: _propTypes2.default.bool,
  isPlaceholder: _propTypes2.default.bool,
  hideOnMobile: _propTypes2.default.bool
};

EuiPaginationButton.defaultProps = {
  children: _react2.default.createElement(
    'span',
    null,
    '\u2026'
  )
};