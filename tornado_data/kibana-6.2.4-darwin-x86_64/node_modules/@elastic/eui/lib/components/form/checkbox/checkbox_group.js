'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiCheckboxGroup = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _checkbox = require('./checkbox');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiCheckboxGroup = function EuiCheckboxGroup(_ref) {
  var options = _ref.options,
      idToSelectedMap = _ref.idToSelectedMap,
      onChange = _ref.onChange,
      className = _ref.className,
      disabled = _ref.disabled,
      rest = _objectWithoutProperties(_ref, ['options', 'idToSelectedMap', 'onChange', 'className', 'disabled']);

  return _react2.default.createElement(
    'div',
    _extends({ className: className }, rest),
    options.map(function (option, index) {
      return _react2.default.createElement(_checkbox.EuiCheckbox, {
        className: 'euiCheckboxGroup__item',
        key: index,
        id: option.id,
        checked: idToSelectedMap[option.id],
        label: option.label,
        disabled: disabled,
        onChange: onChange.bind(null, option.id)
      });
    })
  );
};

exports.EuiCheckboxGroup = EuiCheckboxGroup;
EuiCheckboxGroup.propTypes = {
  options: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string.isRequired,
    label: _propTypes2.default.node
  })).isRequired,
  idToSelectedMap: _propTypes2.default.objectOf(_propTypes2.default.bool).isRequired,
  onChange: _propTypes2.default.func.isRequired
};

EuiCheckboxGroup.defaultProps = {
  options: [],
  idToSelectedMap: {}
};