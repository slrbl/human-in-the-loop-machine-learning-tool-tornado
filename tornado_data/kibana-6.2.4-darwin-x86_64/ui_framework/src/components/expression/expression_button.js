'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiExpressionButton = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const KuiExpressionButton = (_ref) => {
  let className = _ref.className,
      description = _ref.description,
      buttonValue = _ref.buttonValue,
      isActive = _ref.isActive,
      onClick = _ref.onClick,
      rest = _objectWithoutProperties(_ref, ['className', 'description', 'buttonValue', 'isActive', 'onClick']);

  const classes = (0, _classnames2.default)('kuiExpressionButton', className, {
    'kuiExpressionButton-isActive': isActive
  });

  return _react2.default.createElement(
    'button',
    _extends({
      className: classes,
      onClick: onClick
    }, rest),
    _react2.default.createElement(
      'span',
      { className: 'kuiExpressionButton__description' },
      description
    ),
    ' ',
    _react2.default.createElement(
      'span',
      { className: 'kuiExpressionButton__value' },
      buttonValue
    )
  );
};

exports.KuiExpressionButton = KuiExpressionButton;
KuiExpressionButton.propTypes = {
  className: _propTypes2.default.string,
  description: _propTypes2.default.string.isRequired,
  buttonValue: _propTypes2.default.string.isRequired,
  isActive: _propTypes2.default.bool.isRequired,
  onClick: _propTypes2.default.func.isRequired
};

KuiExpressionButton.defaultProps = {
  isActive: false
};
