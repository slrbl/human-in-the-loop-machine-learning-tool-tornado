'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _empty_table_prompt = require('./empty_table_prompt');

var _button = require('../button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiEmptyTablePrompt', () => {
  const component = _react2.default.createElement(_empty_table_prompt.KuiEmptyTablePrompt, _extends({
    actions: _react2.default.createElement(
      _button.KuiLinkButton,
      {
        icon: _react2.default.createElement(_button.KuiButtonIcon, { type: 'create' }),
        'aria-label': 'Add a new item',
        'data-test-subj': 'addNewPromptButton',
        buttonType: 'primary',
        href: '#'
      },
      'Add a new item'
    ),
    message: 'Uh oh, You have no items!'
  }, _required_props.requiredProps));
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
