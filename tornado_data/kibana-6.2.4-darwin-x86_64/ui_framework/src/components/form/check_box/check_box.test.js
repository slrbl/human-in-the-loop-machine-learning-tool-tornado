'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _check_box = require('./check_box');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiCheckBox', () => {
  test('renders', () => {
    const component = _react2.default.createElement(_check_box.KuiCheckBox, _extends({
      onChange: () => {}
    }, _required_props.requiredProps));

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('isChecked', () => {
      test('true renders checked', () => {
        const component = _react2.default.createElement(_check_box.KuiCheckBox, {
          isChecked: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders unchecked', () => {
        const component = _react2.default.createElement(_check_box.KuiCheckBox, {
          isChecked: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      test('true renders disabled', () => {
        const component = _react2.default.createElement(_check_box.KuiCheckBox, {
          isDisabled: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders enabled', () => {
        const component = _react2.default.createElement(_check_box.KuiCheckBox, {
          isDisabled: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('onChange', () => {
      test(`is called when checkbox is changed`, () => {
        const onChangeHandler = _sinon2.default.spy();

        const wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_check_box.KuiCheckBox, {
          onChange: onChangeHandler
        }));

        wrapper.simulate('change');
        _sinon2.default.assert.calledOnce(onChangeHandler);
      });
    });
  });
});
