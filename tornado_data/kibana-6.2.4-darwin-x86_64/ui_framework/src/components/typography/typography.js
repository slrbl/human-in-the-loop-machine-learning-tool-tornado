'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiText = exports.KuiTitle = exports.SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const sizeToClassNameMap = {
  small: 'kuiTitle--small',
  large: 'kuiTitle--large'
};

const SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

const KuiTitle = (_ref) => {
  let size = _ref.size,
      children = _ref.children,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['size', 'children', 'className']);

  const classes = (0, _classnames2.default)('kuiTitle', sizeToClassNameMap[size], className);

  const props = _extends({
    className: classes
  }, rest);

  return (0, _react.cloneElement)(children, props);
};

exports.KuiTitle = KuiTitle;
KuiTitle.propTypes = {
  children: _propTypes2.default.node.isRequired,
  size: _propTypes2.default.oneOf(SIZES)
};

const KuiText = (_ref2) => {
  let children = _ref2.children,
      className = _ref2.className,
      rest = _objectWithoutProperties(_ref2, ['children', 'className']);

  const classes = (0, _classnames2.default)('kuiText', className);

  const props = _extends({
    className: classes
  }, rest);

  return (0, _react.cloneElement)(children, props);
};

exports.KuiText = KuiText;
KuiText.propTypes = {
  children: _propTypes2.default.node.isRequired
};
