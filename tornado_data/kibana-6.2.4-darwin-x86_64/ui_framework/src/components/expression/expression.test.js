'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _expression = require('./expression');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiExpression', () => {
  test('renders', () => {
    const component = _react2.default.createElement(_expression.KuiExpression, _required_props.requiredProps);

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });

  describe('Props', () => {
    describe('children', () => {
      test('is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(
          _expression.KuiExpression,
          null,
          'some expression'
        ));

        expect(component).toMatchSnapshot();
      });
    });
  });
});
