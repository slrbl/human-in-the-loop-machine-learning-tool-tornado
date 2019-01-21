'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFieldNumber = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _form_control_layout = require('../form_control_layout');

var _validatable_control = require('../validatable_control');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiFieldNumber = function EuiFieldNumber(_ref) {
  var className = _ref.className,
      icon = _ref.icon,
      id = _ref.id,
      placeholder = _ref.placeholder,
      name = _ref.name,
      min = _ref.min,
      max = _ref.max,
      value = _ref.value,
      isInvalid = _ref.isInvalid,
      fullWidth = _ref.fullWidth,
      isLoading = _ref.isLoading,
      rest = _objectWithoutProperties(_ref, ['className', 'icon', 'id', 'placeholder', 'name', 'min', 'max', 'value', 'isInvalid', 'fullWidth', 'isLoading']);

  var classes = (0, _classnames2.default)('euiFieldNumber', className, {
    'euiFieldNumber--withIcon': icon,
    'euiFieldNumber--fullWidth': fullWidth,
    'euiFieldNumber-isLoading': isLoading
  });

  return _react2.default.createElement(
    _form_control_layout.EuiFormControlLayout,
    {
      icon: icon,
      fullWidth: fullWidth,
      isLoading: isLoading
    },
    _react2.default.createElement(
      _validatable_control.EuiValidatableControl,
      { isInvalid: isInvalid },
      _react2.default.createElement('input', _extends({
        type: 'number',
        id: id,
        min: min,
        max: max,
        name: name,
        value: value,
        placeholder: placeholder,
        className: classes
      }, rest))
    )
  );
};

exports.EuiFieldNumber = EuiFieldNumber;
EuiFieldNumber.propTypes = {
  id: _propTypes2.default.string,
  name: _propTypes2.default.string,
  min: _propTypes2.default.number,
  max: _propTypes2.default.number,
  step: _propTypes2.default.number,
  value: _propTypes2.default.number,
  icon: _propTypes2.default.string,
  isInvalid: _propTypes2.default.bool,
  fullWidth: _propTypes2.default.bool,
  isLoading: _propTypes2.default.bool
};

EuiFieldNumber.defaultProps = {
  value: undefined,
  fullWidth: false,
  isLoading: false
};