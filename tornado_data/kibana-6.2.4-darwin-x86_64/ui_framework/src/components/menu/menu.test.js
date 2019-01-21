'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _menu = require('./menu');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiMenu', () => {
  const component = _react2.default.createElement(
    _menu.KuiMenu,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

test('contained prop', () => {
  const component = _react2.default.createElement(
    _menu.KuiMenu,
    { contained: true },
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
