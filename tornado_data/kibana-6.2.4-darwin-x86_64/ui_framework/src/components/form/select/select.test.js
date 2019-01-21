'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _select = require('./select');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiSelect', () => {
  test('renders', () => {
    const component = _react2.default.createElement(
      _select.KuiSelect,
      _extends({
        onChange: () => {}
      }, _required_props.requiredProps),
      _react2.default.createElement(
        'option',
        { value: 'apple' },
        'Apple'
      ),
      _react2.default.createElement(
        'option',
        { value: 'bread' },
        'Bread'
      )
    );

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    test('value', () => {
      const component = _react2.default.createElement(
        _select.KuiSelect,
        {
          value: 'apple',
          onChange: () => {}
        },
        _react2.default.createElement(
          'option',
          { value: 'apple' },
          'Apple'
        ),
        _react2.default.createElement(
          'option',
          { value: 'bread' },
          'Bread'
        )
      );

      expect((0, _enzyme.render)(component)).toMatchSnapshot();
    });

    describe('isInvalid', () => {
      test('true renders invalid', () => {
        const component = _react2.default.createElement(_select.KuiSelect, {
          isInvalid: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders valid', () => {
        const component = _react2.default.createElement(_select.KuiSelect, {
          isInvalid: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('isDisabled', () => {
      test('true renders disabled', () => {
        const component = _react2.default.createElement(_select.KuiSelect, {
          isDisabled: true,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders enabled', () => {
        const component = _react2.default.createElement(_select.KuiSelect, {
          isDisabled: false,
          onChange: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('size', () => {
      _select.SELECT_SIZE.forEach(size => {
        test(`renders ${size}`, () => {
          const component = _react2.default.createElement(_select.KuiSelect, {
            size: size,
            onChange: () => {}
          });

          expect((0, _enzyme.render)(component)).toMatchSnapshot();
        });
      });
    });

    describe('onChange', () => {
      test(`is called when an option is selected`, () => {
        const onChangeHandler = _sinon2.default.spy();

        const wrapper = (0, _enzyme.shallow)(_react2.default.createElement(
          _select.KuiSelect,
          {
            onChange: onChangeHandler
          },
          _react2.default.createElement(
            'option',
            { value: 'apple' },
            'Apple'
          ),
          _react2.default.createElement(
            'option',
            { value: 'bread' },
            'Bread'
          )
        ));

        wrapper.simulate('change', 'bread');
        _sinon2.default.assert.calledOnce(onChangeHandler);
      });
    });
  });
});
