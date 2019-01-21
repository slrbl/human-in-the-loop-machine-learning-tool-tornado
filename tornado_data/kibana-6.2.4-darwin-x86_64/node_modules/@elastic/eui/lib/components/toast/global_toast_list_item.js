'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiGlobalToastListItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EuiGlobalToastListItem = exports.EuiGlobalToastListItem = function EuiGlobalToastListItem(_ref) {
  var isDismissed = _ref.isDismissed,
      children = _ref.children;

  var classes = (0, _classnames2.default)('euiGlobalToastListItem', children.props.className, {
    'euiGlobalToastListItem-isDismissed': isDismissed
  });

  return (0, _react.cloneElement)(children, _extends({}, children.props, {
    className: classes
  }));
};

EuiGlobalToastListItem.propTypes = {
  isDismissed: _propTypes2.default.bool,
  children: _propTypes2.default.node
};