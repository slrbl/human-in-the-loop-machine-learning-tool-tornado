'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _label = require('./label');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiLabel', () => {
  test('renders', () => {
    const component = _react2.default.createElement(
      _label.KuiLabel,
      _required_props.requiredProps,
      'label'
    );

    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });
});
