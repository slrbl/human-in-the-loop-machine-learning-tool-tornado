'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _empty_table_prompt_message = require('./empty_table_prompt_message');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiEmptyTablePromptMessage', () => {
  const component = _react2.default.createElement(
    _empty_table_prompt_message.KuiEmptyTablePromptMessage,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
