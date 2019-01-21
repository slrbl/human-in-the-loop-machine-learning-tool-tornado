'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _color_picker = require('./color_picker');

var _required_props = require('../../test/required_props');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let onChange;

beforeEach(() => {
  onChange = _sinon2.default.spy();

  // There's a `console.error` within `react-color`, so we're just "hiding it"
  _sinon2.default.stub(console, 'error');
});

afterEach(() => {
  console.error.restore();
});

test('renders KuiColorPicker', () => {
  const colorPicker = (0, _enzyme.render)(_react2.default.createElement(_color_picker.KuiColorPicker, _extends({
    onChange: onChange,
    color: '#ffeedd'
  }, _required_props.requiredProps)));
  expect(colorPicker).toMatchSnapshot();
});

test('renders KuiColorPicker with an empty swatch when color is null', () => {
  const colorPicker = (0, _enzyme.render)(_react2.default.createElement(_color_picker.KuiColorPicker, _extends({
    onChange: onChange,
    color: null
  }, _required_props.requiredProps)));
  expect(colorPicker).toMatchSnapshot();
});

test('renders KuiColorPicker without a color label when showColorLabel is false', () => {
  const colorPicker = (0, _enzyme.render)(_react2.default.createElement(_color_picker.KuiColorPicker, _extends({
    onChange: onChange,
    color: '#ffffff',
    showColorLabel: false
  }, _required_props.requiredProps)));
  expect(colorPicker).toMatchSnapshot();
});

test('pop up color selector is not shown by default', () => {
  const colorPicker = (0, _enzyme.mount)(_react2.default.createElement(_color_picker.KuiColorPicker, _extends({
    onChange: onChange,
    color: '#ffeedd'
  }, _required_props.requiredProps)));

  const colorSelector = colorPicker.find('[data-test-subj="colorPickerPopup"]');
  expect(colorSelector.length).toBe(0);
});

test('pop up color selector is shown when the color swatch is clicked', () => {
  const colorPicker = (0, _enzyme.mount)(_react2.default.createElement(_color_picker.KuiColorPicker, _extends({
    onChange: onChange,
    color: '#ffeedd'
  }, _required_props.requiredProps)));

  colorPicker.find('[data-test-subj="colorSwatch"]').simulate('click');
  const colorSelector = colorPicker.find('[data-test-subj="colorPickerPopup"]');
  expect(colorSelector.length).toBe(1);
});

test('pop up color selector is hidden when the color swatch is clicked twice', () => {
  const colorPicker = (0, _enzyme.mount)(_react2.default.createElement(_color_picker.KuiColorPicker, _extends({
    onChange: onChange,
    color: '#ffeedd'
  }, _required_props.requiredProps)));

  colorPicker.find('[data-test-subj="colorSwatch"]').simulate('click');
  colorPicker.find('[data-test-subj="colorSwatch"]').simulate('click');
  const colorSelector = colorPicker.find('[data-test-subj="colorPickerPopup"]');
  expect(colorSelector.length).toBe(0);
});

test('Setting a new color calls onChange', () => {
  const colorPicker = (0, _enzyme.mount)(_react2.default.createElement(_color_picker.KuiColorPicker, _extends({
    onChange: onChange,
    color: '#ffeedd'
  }, _required_props.requiredProps)));

  colorPicker.find('[data-test-subj="colorSwatch"]').simulate('click');
  const event = { target: { value: '#000000' } };
  const inputs = colorPicker.find('input');
  expect(inputs.length).toBe(1);
  inputs.simulate('change', event);
  _sinon2.default.assert.calledOnce(onChange);
  _sinon2.default.assert.calledWith(onChange, '#000000');
});
