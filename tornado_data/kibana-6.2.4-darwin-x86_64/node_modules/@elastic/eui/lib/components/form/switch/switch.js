'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSwitch = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiSwitch = function EuiSwitch(_ref) {
  var label = _ref.label,
      id = _ref.id,
      name = _ref.name,
      checked = _ref.checked,
      disabled = _ref.disabled,
      onChange = _ref.onChange,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['label', 'id', 'name', 'checked', 'disabled', 'onChange', 'className']);

  var classes = (0, _classnames2.default)('euiSwitch', className);

  return _react2.default.createElement(
    'div',
    { className: classes },
    _react2.default.createElement('input', _extends({
      className: 'euiSwitch__input',
      name: name,
      id: id,
      type: 'checkbox',
      checked: checked,
      disabled: disabled,
      onChange: onChange
    }, rest)),
    _react2.default.createElement(
      'span',
      { className: 'euiSwitch__body' },
      _react2.default.createElement('span', { className: 'euiSwitch__thumb' }),
      _react2.default.createElement(
        'span',
        { className: 'euiSwitch__track' },
        _react2.default.createElement(_icon.EuiIcon, {
          type: 'cross',
          size: 'm',
          className: 'euiSwitch__icon'
        }),
        _react2.default.createElement(_icon.EuiIcon, {
          type: 'check',
          size: 'm',
          className: 'euiSwitch__icon euiSwitch__icon--checked'
        })
      )
    ),
    _react2.default.createElement(
      'label',
      {
        className: 'euiSwitch__label',
        htmlFor: id
      },
      label
    )
  );
};

exports.EuiSwitch = EuiSwitch;
EuiSwitch.propTypes = {
  name: _propTypes2.default.string,
  id: _propTypes2.default.string,
  label: _propTypes2.default.node,
  checked: _propTypes2.default.bool,
  onChange: _propTypes2.default.func
};