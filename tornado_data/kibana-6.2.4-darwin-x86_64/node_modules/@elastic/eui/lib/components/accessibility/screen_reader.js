'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiScreenReaderOnly = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EuiScreenReaderOnly = exports.EuiScreenReaderOnly = function EuiScreenReaderOnly(_ref) {
  var children = _ref.children;

  var classes = (0, _classnames2.default)('euiScreenReaderOnly', children.props.className);

  var props = _extends({}, children.props, {
    className: classes
  });

  return (0, _react.cloneElement)(children, props);
};

EuiScreenReaderOnly.propTypes = {
  children: _propTypes2.default.node
};