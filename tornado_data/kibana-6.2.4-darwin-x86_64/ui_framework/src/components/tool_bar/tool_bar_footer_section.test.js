'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _tool_bar_footer_section = require('./tool_bar_footer_section');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiToolBarFooterSection', () => {
  const component = _react2.default.createElement(
    _tool_bar_footer_section.KuiToolBarFooterSection,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
