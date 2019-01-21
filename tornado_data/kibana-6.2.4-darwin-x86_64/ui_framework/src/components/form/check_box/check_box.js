'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiCheckBox = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const KuiCheckBox = (_ref) => {
  let className = _ref.className,
      isChecked = _ref.isChecked,
      isDisabled = _ref.isDisabled,
      onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ['className', 'isChecked', 'isDisabled', 'onChange']);

  const classes = (0, _classnames2.default)('kuiCheckBox', className);

  return _react2.default.createElement('input', _extends({
    type: 'checkbox',
    className: classes,
    checked: isChecked,
    disabled: isDisabled,
    onChange: onChange
  }, rest));
};

exports.KuiCheckBox = KuiCheckBox;
KuiCheckBox.defaultProps = {
  isChecked: false,
  isDisabled: false
};

KuiCheckBox.propTypes = {
  className: _propTypes2.default.string,
  isChecked: _propTypes2.default.bool,
  isDisabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired
};
