'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiScreenReaderOnly = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KuiScreenReaderOnly = exports.KuiScreenReaderOnly = ({ children }) => {
  const classes = (0, _classnames2.default)('kuiScreenReaderOnly', children.props.className);

  const props = _extends({}, children.props, {
    className: classes
  });

  return (0, _react.cloneElement)(children, props);
};

KuiScreenReaderOnly.propTypes = {
  children: _propTypes2.default.node
};
