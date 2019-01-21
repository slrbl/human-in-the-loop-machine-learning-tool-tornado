'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _test = require('../../../test');

var _listing_table = require('./listing_table');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const getProps = customProps => {
  const defaultProps = {
    header: ['Breed', 'Description'],
    rows: [{
      id: '1',
      cells: ['Bengal', 'An athlete, spotted cat']
    }, {
      id: '2',
      cells: ['Himalayan', 'Affectionate but discriminating']
    }, {
      id: '3',
      cells: ['Chartreux', 'Silent but communicative and sometimes silly']
    }],
    onItemSelectionChanged: jest.fn(),
    selectedRowIds: [],
    onFilter: jest.fn()
  };

  return _extends({}, defaultProps, _test.requiredProps, customProps);
};

test('renders KuiListingTable', () => {
  const component = (0, _enzyme.mount)(_react2.default.createElement(_listing_table.KuiListingTable, getProps()));
  expect((0, _test.takeMountedSnapshot)(component)).toMatchSnapshot();
});

test('selecting a row calls onItemSelectionChanged', () => {
  const props = getProps();
  const component = (0, _enzyme.shallow)(_react2.default.createElement(_listing_table.KuiListingTable, props));
  component.find('KuiListingTableRow').at(1).prop('onSelectionChanged')('1');
  expect(props.onItemSelectionChanged).toHaveBeenCalledWith(['1']);
});

test('selectedRowIds is preserved when onItemSelectionChanged is called', () => {
  const props = getProps({ selectedRowIds: ['3'] });
  const component = (0, _enzyme.shallow)(_react2.default.createElement(_listing_table.KuiListingTable, props));
  component.find('KuiListingTableRow').at(0).prop('onSelectionChanged')('1');
  expect(props.onItemSelectionChanged).toHaveBeenCalledWith(expect.arrayContaining(['1', '3']));
});

test('onFilter is called when the search box is used', () => {
  const props = getProps();
  const component = (0, _enzyme.mount)(_react2.default.createElement(_listing_table.KuiListingTable, props));
  component.find('KuiToolBarSearchBox').prop('onFilter')('a filter');
  expect(props.onFilter).toHaveBeenCalledWith('a filter');
});
