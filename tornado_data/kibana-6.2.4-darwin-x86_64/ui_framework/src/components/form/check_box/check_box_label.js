'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiCheckBoxLabel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _check_box = require('./check_box');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const KuiCheckBoxLabel = (_ref) => {
  let className = _ref.className,
      text = _ref.text,
      isChecked = _ref.isChecked,
      isDisabled = _ref.isDisabled,
      onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ['className', 'text', 'isChecked', 'isDisabled', 'onChange']);

  const classes = (0, _classnames2.default)('kuiCheckBoxLabel', className);

  return _react2.default.createElement(
    'label',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement(_check_box.KuiCheckBox, {
      isChecked: isChecked,
      isDisabled: isDisabled,
      onChange: onChange
    }),
    _react2.default.createElement(
      'span',
      { className: 'kuiCheckBoxLabel__text' },
      text
    )
  );
};

exports.KuiCheckBoxLabel = KuiCheckBoxLabel;
KuiCheckBoxLabel.defaultProps = {
  isChecked: false,
  isDisabled: false
};

KuiCheckBoxLabel.propTypes = {
  className: _propTypes2.default.string,
  text: _propTypes2.default.string,
  isChecked: _propTypes2.default.bool,
  isDisabled: _propTypes2.default.bool,
  onChange: _propTypes2.default.func.isRequired
};
