'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _table_header_check_box_cell = require('./table_header_check_box_cell');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiTableHeaderCheckBoxCell', () => {
  const component = _react2.default.createElement(
    _table_header_check_box_cell.KuiTableHeaderCheckBoxCell,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});
