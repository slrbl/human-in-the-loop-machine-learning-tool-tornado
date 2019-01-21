'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _field_group_section = require('./field_group_section');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiFieldGroupSection', () => {
  const component = _react2.default.createElement(
    _field_group_section.KuiFieldGroupSection,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

test('renders KuiFieldGroupSection isWide', () => {
  const component = _react2.default.createElement(
    _field_group_section.KuiFieldGroupSection,
    _extends({ isWide: true }, _required_props.requiredProps),
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
