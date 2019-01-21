'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiColorPicker = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactColor = require('react-color');

var _outside_click_detector = require('../outside_click_detector');

var _color_picker_swatch = require('./color_picker_swatch');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class KuiColorPicker extends _react2.default.Component {
  constructor(props) {
    super(props);

    this.closeColorSelector = () => {
      this.setState({ showColorSelector: false });
    };

    this.toggleColorSelector = () => {
      this.setState({ showColorSelector: !this.state.showColorSelector });
    };

    this.handleColorSelection = color => {
      this.props.onChange(color.hex);
    };

    this.state = {
      showColorSelector: false
    };
  }

  getColorLabel() {
    const color = this.props.color;

    const colorValue = color === null ? '(transparent)' : color;
    return _react2.default.createElement(
      'div',
      {
        className: 'kuiColorPicker__label',
        'aria-label': `Color selection is ${colorValue}`
      },
      colorValue
    );
  }

  render() {
    var _props = this.props;
    const color = _props.color,
          className = _props.className,
          showColorLabel = _props.showColorLabel;

    const classes = (0, _classnames2.default)('kuiColorPicker', className);
    return _react2.default.createElement(
      _outside_click_detector.KuiOutsideClickDetector,
      { onOutsideClick: this.closeColorSelector },
      _react2.default.createElement(
        'div',
        {
          className: classes,
          'data-test-subj': this.props['data-test-subj']
        },
        _react2.default.createElement(
          'div',
          {
            className: 'kuiColorPicker__preview',
            onClick: this.toggleColorSelector
          },
          _react2.default.createElement(_color_picker_swatch.KuiColorPickerSwatch, { color: color, 'aria-label': this.props['aria-label'] }),
          showColorLabel ? this.getColorLabel() : null
        ),
        this.state.showColorSelector ? _react2.default.createElement(
          'div',
          { className: 'kuiColorPickerPopUp', 'data-test-subj': 'colorPickerPopup' },
          _react2.default.createElement(_reactColor.ChromePicker, {
            color: color ? color : '#ffffff',
            disableAlpha: true,
            onChange: this.handleColorSelection
          })
        ) : null
      )
    );
  }
}

exports.KuiColorPicker = KuiColorPicker;
KuiColorPicker.propTypes = {
  className: _propTypes2.default.string,
  color: _propTypes2.default.string,
  onChange: _propTypes2.default.func.isRequired,
  showColorLabel: _propTypes2.default.bool
};

KuiColorPicker.defaultProps = {
  'aria-label': 'Select a color',
  showColorLabel: true
};
