'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _check_box_label = require('./check_box_label');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiCheckBoxLabel', () => {
  test('renders', () => {
    const component = _react2.default.createElement(_check_box_label.KuiCheckBoxLabel, _extends({
      onChange: () => {}
    }, _required_props.requiredProps));

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    test('text', () => {
      const component = _react2.default.createElement(_check_box_label.KuiCheckBoxLabel, {
        text: 'text',
        onChange: () => {}
      });

      expect((0, _enzyme.render)(component)).toMatchSnapshot();
    });

    describe('isChecked', () => {
      test('true renders checked', () => {
        const component = _react2.default.createElement(_check_box_label.KuiCheckBoxLabel, {
          isChecked: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders unchecked', () => {
        const component = _react2.default.createElement(_check_box_label.KuiCheckBoxLabel, {
          isChecked: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      test('true renders disabled', () => {
        const component = _react2.default.createElement(_check_box_label.KuiCheckBoxLabel, {
          isDisabled: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders enabled', () => {
        const component = _react2.default.createElement(_check_box_label.KuiCheckBoxLabel, {
          isDisabled: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('onChange', () => {
      test(`is called when checkbox is changed`, () => {
        const onChangeHandler = _sinon2.default.spy();

        const wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_check_box_label.KuiCheckBoxLabel, {
          onChange: onChangeHandler
        }));

        wrapper.find('KuiCheckBox').simulate('change');
        _sinon2.default.assert.calledOnce(onChangeHandler);
      });
    });
  });
});
