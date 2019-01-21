'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.KuiListingTable = KuiListingTable;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _listing_table_tool_bar = require('./listing_table_tool_bar');

var _listing_table_tool_bar_footer = require('./listing_table_tool_bar_footer');

var _listing_table_row = require('./listing_table_row');

var _index = require('../../index');

var _services = require('../../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function KuiListingTable({
  rows,
  header,
  pager,
  toolBarActions,
  onFilter,
  onItemSelectionChanged,
  selectedRowIds,
  filter,
  prompt
}) {

  function areAllRowsSelected() {
    return rows.length > 0 && rows.length === selectedRowIds.length;
  }

  function toggleAll() {
    if (areAllRowsSelected()) {
      onItemSelectionChanged([]);
    } else {
      onItemSelectionChanged(rows.map(row => row.id));
    }
  }

  function toggleRow(rowId) {
    const selectedRowIndex = selectedRowIds.indexOf(rowId);
    if (selectedRowIndex >= 0) {
      onItemSelectionChanged(selectedRowIds.filter((item, index) => index !== selectedRowIndex));
    } else {
      onItemSelectionChanged([...selectedRowIds, rowId]);
    }
  }

  function renderTableRows() {
    return rows.map((row, rowIndex) => {
      return _react2.default.createElement(_listing_table_row.KuiListingTableRow, {
        key: rowIndex,
        isSelected: selectedRowIds.indexOf(row.id) >= 0,
        onSelectionChanged: toggleRow,
        row: row
      });
    });
  }

  function renderHeader() {
    return header.map((cell, index) => {
      let content = cell.content,
          props = _objectWithoutProperties(cell, ['content']);

      if (_react2.default.isValidElement(cell) || !_lodash2.default.isObject(cell)) {
        props = [];
        content = cell;
      }
      return _react2.default.createElement(
        _index.KuiTableHeaderCell,
        _extends({
          key: index
        }, props),
        content
      );
    });
  }

  function renderInnerTable() {
    return _react2.default.createElement(
      _index.KuiTable,
      null,
      _react2.default.createElement(
        _index.KuiTableHeader,
        null,
        _react2.default.createElement(_index.KuiTableHeaderCheckBoxCell, {
          isChecked: areAllRowsSelected(),
          onChange: toggleAll
        }),
        renderHeader()
      ),
      _react2.default.createElement(
        _index.KuiTableBody,
        null,
        renderTableRows()
      )
    );
  }

  return _react2.default.createElement(
    _index.KuiControlledTable,
    null,
    _react2.default.createElement(_listing_table_tool_bar.KuiListingTableToolBar, {
      actions: toolBarActions,
      pager: pager,
      onFilter: onFilter,
      filter: filter
    }),
    prompt ? prompt : renderInnerTable(),
    _react2.default.createElement(_listing_table_tool_bar_footer.KuiListingTableToolBarFooter, {
      itemsSelectedCount: selectedRowIds.length,
      pager: pager
    })
  );
}

KuiListingTable.propTypes = {
  header: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.shape({
    content: _propTypes2.default.node,
    align: _propTypes2.default.oneOf([_services.LEFT_ALIGNMENT, _services.RIGHT_ALIGNMENT]),
    onSort: _propTypes2.default.func,
    isSortAscending: _propTypes2.default.bool,
    isSorted: _propTypes2.default.bool
  })])),
  rows: _propTypes2.default.arrayOf(_propTypes2.default.shape({
    id: _propTypes2.default.string,
    cells: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.shape({
      content: _propTypes2.default.node,
      align: _propTypes2.default.oneOf([_services.LEFT_ALIGNMENT, _services.RIGHT_ALIGNMENT])
    })]))
  })),
  pager: _propTypes2.default.node,
  onItemSelectionChanged: _propTypes2.default.func.isRequired,
  selectedRowIds: _propTypes2.default.array,
  prompt: _propTypes2.default.node, // If given, will be shown instead of a table with rows.
  onFilter: _propTypes2.default.func,
  toolBarActions: _propTypes2.default.node,
  filter: _propTypes2.default.string
};

KuiListingTable.defaultProps = {
  rows: [],
  selectedRowIds: []
};
