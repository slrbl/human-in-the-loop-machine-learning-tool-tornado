'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _expression_button = require('./expression_button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiExpressionButton', () => {
  test('renders', () => {
    const component = _react2.default.createElement(_expression_button.KuiExpressionButton, _extends({
      description: 'the answer is',
      buttonValue: '42',
      isActive: false,
      onClick: () => {}
    }, _required_props.requiredProps));

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('isActive', () => {
      test('true renders active', () => {
        const component = _react2.default.createElement(_expression_button.KuiExpressionButton, {
          description: 'the answer is',
          buttonValue: '42',
          isActive: true,
          onClick: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });

      test('false renders inactive', () => {
        const component = _react2.default.createElement(_expression_button.KuiExpressionButton, {
          description: 'the answer is',
          buttonValue: '42',
          isActive: false,
          onClick: () => {}
        });

        expect((0, _enzyme.render)(component)).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test('is called when the button is clicked', () => {
        const onClickHandler = _sinon2.default.spy();

        const button = (0, _enzyme.shallow)(_react2.default.createElement(_expression_button.KuiExpressionButton, _extends({
          description: 'the answer is',
          buttonValue: '42',
          isActive: false,
          onClick: onClickHandler
        }, _required_props.requiredProps)));

        button.simulate('click');

        _sinon2.default.assert.calledOnce(onClickHandler);
      });
    });
  });
});
