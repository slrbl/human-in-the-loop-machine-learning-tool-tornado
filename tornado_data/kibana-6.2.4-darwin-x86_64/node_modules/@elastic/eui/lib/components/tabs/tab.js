'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTab = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiTab = function EuiTab(_ref) {
  var isSelected = _ref.isSelected,
      onClick = _ref.onClick,
      children = _ref.children,
      className = _ref.className,
      disabled = _ref.disabled,
      rest = _objectWithoutProperties(_ref, ['isSelected', 'onClick', 'children', 'className', 'disabled']);

  var classes = (0, _classnames2.default)('euiTab', className, {
    'euiTab-isSelected': isSelected,
    'euiTab-isDisabled': disabled
  });

  return _react2.default.createElement(
    'button',
    _extends({
      role: 'tab',
      'aria-selected': !!isSelected,
      type: 'button',
      className: classes,
      onClick: onClick,
      disabled: disabled
    }, rest),
    _react2.default.createElement(
      'span',
      { className: 'euiTab__content' },
      children
    )
  );
};

exports.EuiTab = EuiTab;
EuiTab.defaultProps = {
  isSelected: false,
  disabled: false
};

EuiTab.propTypes = {
  isSelected: _propTypes2.default.bool,
  onClick: _propTypes2.default.func.isRequired,
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  disabled: _propTypes2.default.bool
};