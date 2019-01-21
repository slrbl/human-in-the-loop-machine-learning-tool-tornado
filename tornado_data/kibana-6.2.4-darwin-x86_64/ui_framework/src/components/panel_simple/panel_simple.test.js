'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _panel_simple = require('./panel_simple');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiPanelSimple', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(_panel_simple.KuiPanelSimple, _required_props.requiredProps));

    expect(component).toMatchSnapshot();
  });
});
