'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.KuiLocalTab = KuiLocalTab;

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function KuiLocalTab(_ref) {
  let className = _ref.className,
      children = _ref.children,
      isDisabled = _ref.isDisabled,
      isSelected = _ref.isSelected,
      rest = _objectWithoutProperties(_ref, ['className', 'children', 'isDisabled', 'isSelected']);

  const classes = (0, _classnames2.default)('kuiLocalTab', className, {
    'kuiLocalTab-isDisabled': isDisabled,
    'kuiLocalTab-isSelected': isSelected
  });
  return _react2.default.createElement(
    'a',
    _extends({ className: classes }, rest),
    children
  );
}

KuiLocalTab.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  isDisabled: _propTypes2.default.bool,
  isSelected: _propTypes2.default.bool
};

KuiLocalTab.defaultProps = {
  isDisabled: false,
  isSelected: false
};
