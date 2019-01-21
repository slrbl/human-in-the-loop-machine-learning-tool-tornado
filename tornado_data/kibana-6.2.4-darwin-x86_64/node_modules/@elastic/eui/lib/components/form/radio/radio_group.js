'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiRadioGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _radio = require('./radio');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiRadioGroup = function EuiRadioGroup(_ref) {
  var options = _ref.options,
      idSelected = _ref.idSelected,
      onChange = _ref.onChange,
      className = _ref.className,
      disabled = _ref.disabled,
      rest = _objectWithoutProperties(_ref, ['options', 'idSelected', 'onChange', 'className', 'disabled']);

  return _react2.default.createElement(
    'div',
    _extends({ className: className }, rest),
    options.map(function (option, index) {
      return _react2.default.createElement(_radio.EuiRadio, {
        className: 'euiRadioGroup__item',
        key: index,
        id: option.id,
        checked: option.id === idSelected,
        label: option.label,
        disabled: disabled,
        onChange: onChange.bind(null, option.id)
      });
    })
  );
};

exports.EuiRadioGroup = EuiRadioGroup;
EuiRadioGroup.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.node
  })).isRequired,
  idSelected: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired
};

EuiRadioGroup.defaultProps = {
  options: []
};