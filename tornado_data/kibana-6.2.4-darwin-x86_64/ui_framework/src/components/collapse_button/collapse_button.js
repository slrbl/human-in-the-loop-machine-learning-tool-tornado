'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiCollapseButton = exports.DIRECTIONS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const DIRECTIONS = ['down', 'up', 'left', 'right'];

const directionToClassNameMap = {
  down: 'fa-chevron-circle-down',
  up: 'fa-chevron-circle-up',
  left: 'fa-chevron-circle-left',
  right: 'fa-chevron-circle-right'
};

const KuiCollapseButton = (_ref) => {
  let className = _ref.className,
      direction = _ref.direction,
      rest = _objectWithoutProperties(_ref, ['className', 'direction']);

  const classes = (0, _classnames2.default)('kuiCollapseButton', className);
  const childClasses = (0, _classnames2.default)('kuiIcon', directionToClassNameMap[direction]);

  return _react2.default.createElement(
    'button',
    _extends({
      type: 'button',
      className: classes
    }, rest),
    _react2.default.createElement('span', { className: childClasses })
  );
};

KuiCollapseButton.propTypes = {
  className: _propTypes2.default.string,
  direction: _propTypes2.default.oneOf(DIRECTIONS).isRequired
};

exports.DIRECTIONS = DIRECTIONS;
exports.KuiCollapseButton = KuiCollapseButton;
