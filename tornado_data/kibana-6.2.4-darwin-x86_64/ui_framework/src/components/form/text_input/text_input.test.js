'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _test = require('../../../test');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _text_input = require('./text_input');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiTextInput', () => {
  test('renders', () => {
    const component = _react2.default.createElement(_text_input.KuiTextInput, _extends({
      value: 'text input',
      onChange: () => {}
    }, _test.requiredProps));

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    test('placeholder', () => {
      const component = _react2.default.createElement(_text_input.KuiTextInput, {
        placeholder: 'placeholder',
        onChange: () => {}
      });

      expect((0, _enzyme.render)(component)).toMatchSnapshot();
    });

    test('value', () => {
      const component = _react2.default.createElement(_text_input.KuiTextInput, {
        value: 'value',
        onChange: () => {}
      });

      expect((0, _enzyme.render)(component)).toMatchSnapshot();
    });

    describe('autoFocus', () => {
      test('sets focus on the element', () => {
        const component = (0, _enzyme.mount)(_react2.default.createElement(_text_input.KuiTextInput, {
          autoFocus: true,
          onChange: () => {},
          'data-test-subj': 'input'
        }));

        expect((0, _test.findTestSubject)(component, 'input').getDOMNode()).toBe(document.activeElement);
      });

      test('does not focus the element by default', () => {
        const component = (0, _enzyme.mount)(_react2.default.createElement(_text_input.KuiTextInput, {
          onChange: () => {},
          'data-test-subj': 'input'
        }));

        expect((0, _test.findTestSubject)(component, 'input').getDOMNode()).not.toBe(document.activeElement);
      });
    });

    describe('isInvalid', () => {
      test('true renders invalid', () => {
        const component = _react2.default.createElement(_text_input.KuiTextInput, {
          isInvalid: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders valid', () => {
        const component = _react2.default.createElement(_text_input.KuiTextInput, {
          isInvalid: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      test('true renders disabled', () => {
        const component = _react2.default.createElement(_text_input.KuiTextInput, {
          isDisabled: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders enabled', () => {
        const component = _react2.default.createElement(_text_input.KuiTextInput, {
          isDisabled: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('size', () => {
      _text_input.TEXTINPUT_SIZE.forEach(size => {
        test(`renders ${size}`, () => {
          const component = _react2.default.createElement(_text_input.KuiTextInput, {
            size: size,
            onChange: () => {}
          });

          expect((0, _enzyme.render)(component)).toMatchSnapshot();
        });
      });
    });

    describe('onChange', () => {
      test(`is called when input is changed`, () => {
        const onChangeHandler = _sinon2.default.spy();

        const wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_text_input.KuiTextInput, {
          onChange: onChangeHandler
        }));

        wrapper.simulate('change');
        _sinon2.default.assert.calledOnce(onChangeHandler);
      });
    });
  });
});
