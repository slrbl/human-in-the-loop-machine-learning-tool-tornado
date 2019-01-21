'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiFlexItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const validGrowNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const KuiFlexItem = (_ref) => {
  let children = _ref.children,
      className = _ref.className,
      grow = _ref.grow,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'grow']);

  const classes = (0, _classnames2.default)('kuiFlexItem', {
    'kuiFlexItem--flexGrowZero': !grow,
    [`kuiFlexItem--flexGrow${grow}`]: validGrowNumbers.indexOf(grow) >= 0
  }, className);

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.KuiFlexItem = KuiFlexItem;
KuiFlexItem.propTypes = {
  children: _propTypes2.default.node,
  grow: growPropType
};

function growPropType(props, propName, componentName) {
  const value = props[propName];

  const validValues = [null, undefined, true, false, ...validGrowNumbers];

  if (validValues.indexOf(value) === -1) {
    return new Error(`Prop \`${propName}\` supplied to \`${componentName}\` must be a boolean or an integer between 1 and 10.`);
  }
}

KuiFlexItem.defaultProps = {
  grow: true
};
