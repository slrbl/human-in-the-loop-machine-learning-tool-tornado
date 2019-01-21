'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _popover_title = require('./popover_title');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiPopoverTitle', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(_popover_title.KuiPopoverTitle, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});
