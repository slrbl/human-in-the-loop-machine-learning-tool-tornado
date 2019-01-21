'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiColorPickerSwatch = KuiColorPickerSwatch;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _color_picker_empty_swatch = require('./color_picker_empty_swatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function KuiColorPickerSwatch(props) {
  const color = props.color,
        className = props.className;

  const isClear = !color;
  const classes = (0, _classnames2.default)('kuiColorPicker__swatch', className, {
    'kuiColorPicker__emptySwatch': isClear
  });
  let children;

  if (isClear) {
    children = _react2.default.createElement(_color_picker_empty_swatch.KuiColorPickerEmptySwatch, null);
  }

  return _react2.default.createElement(
    'div',
    {
      className: classes,
      'aria-label': props['aria-label'],
      'data-test-subj': 'colorSwatch',
      style: { background: color ? color : '' }
    },
    children
  );
}

KuiColorPickerSwatch.propTypes = {
  className: _propTypes2.default.string,
  color: _propTypes2.default.string
};
