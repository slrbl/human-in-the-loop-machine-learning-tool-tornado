'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _required_props = require('../../test/required_props');

var _tool_bar_search_box = require('./tool_bar_search_box');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const onFilter = _sinon2.default.spy();

test('renders KuiToolBarSearchBox', () => {
  const component = _react2.default.createElement(_tool_bar_search_box.KuiToolBarSearchBox, _extends({ onFilter: onFilter }, _required_props.requiredProps));
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

describe('onFilter', () => {
  test('is called on change event, with the value entered', () => {
    const searchBox = (0, _enzyme.mount)(_react2.default.createElement(_tool_bar_search_box.KuiToolBarSearchBox, _extends({ onFilter: onFilter }, _required_props.requiredProps)));
    onFilter.reset();
    const event = { target: { value: 'a' } };
    searchBox.find('input').simulate('change', event);
    _sinon2.default.assert.calledWith(onFilter, 'a');
  });
});

describe('filter', () => {
  test('initializes search box value', () => {
    const component = _react2.default.createElement(_tool_bar_search_box.KuiToolBarSearchBox, { onFilter: onFilter, filter: 'My Query' });
    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });
});

describe('placeholder', () => {
  test('initializes search box placeholder', () => {
    const component = _react2.default.createElement(_tool_bar_search_box.KuiToolBarSearchBox, { onFilter: onFilter, placeholder: 'Filter items...' });
    expect((0, _enzyme.render)(component)).toMatchSnapshot();
  });
});
