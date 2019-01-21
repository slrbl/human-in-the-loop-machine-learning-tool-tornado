'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiRadio = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiRadio = function EuiRadio(_ref) {
  var className = _ref.className,
      id = _ref.id,
      checked = _ref.checked,
      label = _ref.label,
      onChange = _ref.onChange,
      disabled = _ref.disabled,
      rest = _objectWithoutProperties(_ref, ['className', 'id', 'checked', 'label', 'onChange', 'disabled']);

  var classes = (0, _classnames2.default)('euiRadio', className);

  var optionalLabel = void 0;

  if (label) {
    optionalLabel = _react2.default.createElement(
      'label',
      {
        className: 'euiRadio__label',
        htmlFor: id
      },
      label
    );
  }

  return _react2.default.createElement(
    'div',
    _extends({
      className: classes
    }, rest),
    _react2.default.createElement('input', {
      className: 'euiRadio__input',
      type: 'radio',
      id: id,
      checked: checked,
      onChange: onChange,
      disabled: disabled
    }),
    _react2.default.createElement(
      'div',
      { className: 'euiRadio__circle' },
      _react2.default.createElement('div', { className: 'euiRadio__check' })
    ),
    optionalLabel
  );
};

exports.EuiRadio = EuiRadio;
EuiRadio.propTypes = {
  className: _propTypes2.default.string,
  id: _propTypes2.default.string.isRequired,
  checked: _propTypes2.default.bool.isRequired,
  label: _propTypes2.default.node,
  onChange: _propTypes2.default.func.isRequired,
  disabled: _propTypes2.default.bool
};

EuiRadio.defaultProps = {
  checked: false,
  disabled: false
};