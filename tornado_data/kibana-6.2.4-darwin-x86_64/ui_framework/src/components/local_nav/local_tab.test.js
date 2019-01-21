'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _local_tab = require('./local_tab');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiLocalTab', () => {
  const component = _react2.default.createElement(
    _local_tab.KuiLocalTab,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

describe('property isSelected', () => {
  test('renders the isSelected modifier', () => {
    const component = _react2.default.createElement(
      _local_tab.KuiLocalTab,
      _extends({ isSelected: true }, _required_props.requiredProps),
      'children'
    );
    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });
});

describe('property isDisabled', () => {
  test('renders the isDisabled modifier', () => {
    const component = _react2.default.createElement(
      _local_tab.KuiLocalTab,
      _extends({ isDisabled: true }, _required_props.requiredProps),
      'children'
    );
    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });
});
