'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _text_area = require('./text_area');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiTextArea', () => {
  test('renders', () => {
    const component = _react2.default.createElement(_text_area.KuiTextArea, _extends({
      value: 'text area',
      onChange: () => {}
    }, _required_props.requiredProps));

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    test('placeholder', () => {
      const component = _react2.default.createElement(_text_area.KuiTextArea, {
        placeholder: 'placeholder',
        onChange: () => {}
      });

      expect((0, _enzyme.render)(component)).toMatchSnapshot();
    });

    test('value', () => {
      const component = _react2.default.createElement(_text_area.KuiTextArea, {
        value: 'value',
        onChange: () => {}
      });

      expect((0, _enzyme.render)(component)).toMatchSnapshot();
    });

    describe('isInvalid', () => {
      test('true renders invalid', () => {
        const component = _react2.default.createElement(_text_area.KuiTextArea, {
          isInvalid: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders valid', () => {
        const component = _react2.default.createElement(_text_area.KuiTextArea, {
          isInvalid: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('isNonResizable', () => {
      test('true renders non-resizable', () => {
        const component = _react2.default.createElement(_text_area.KuiTextArea, {
          isNonResizable: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders resizable', () => {
        const component = _react2.default.createElement(_text_area.KuiTextArea, {
          isNonResizable: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      test('true renders disabled', () => {
        const component = _react2.default.createElement(_text_area.KuiTextArea, {
          isDisabled: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders enabled', () => {
        const component = _react2.default.createElement(_text_area.KuiTextArea, {
          isDisabled: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('size', () => {
      _text_area.TEXTAREA_SIZE.forEach(size => {
        test(`renders ${size}`, () => {
          const component = _react2.default.createElement(_text_area.KuiTextArea, {
            size: size,
            onChange: () => {}
          });

          expect((0, _enzyme.render)(component)).toMatchSnapshot();
        });
      });
    });

    describe('onChange', () => {
      test(`is called when textarea is written`, () => {
        const onChangeHandler = _sinon2.default.spy();

        const wrapper = (0, _enzyme.shallow)(_react2.default.createElement(_text_area.KuiTextArea, {
          onChange: onChangeHandler
        }));

        wrapper.simulate('change');
        _sinon2.default.assert.calledOnce(onChangeHandler);
      });
    });
  });
});
