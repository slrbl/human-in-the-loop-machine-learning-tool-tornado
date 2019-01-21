'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiListingTableRow = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _2 = require('../');

var _services = require('../../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

class KuiListingTableRow extends _react2.default.PureComponent {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.onSelectionChanged = () => {
      this.props.onSelectionChanged(this.props.row.id);
    }, _temp;
  }

  renderCells() {
    return this.props.row.cells.map((cell, index) => {
      let content = cell.content,
          props = _objectWithoutProperties(cell, ['content']);

      if (_react2.default.isValidElement(cell) || !_lodash2.default.isObject(cell)) {
        props = [];
        content = cell;
      }
      return _react2.default.createElement(
        _2.KuiTableRowCell,
        _extends({
          key: index
        }, props),
        content
      );
    });
  }

  render() {
    const isSelected = this.props.isSelected;

    return _react2.default.createElement(
      _2.KuiTableRow,
      null,
      _react2.default.createElement(_2.KuiTableRowCheckBoxCell, {
        isChecked: isSelected,
        onChange: this.onSelectionChanged
      }),
      this.renderCells()
    );
  }
}

exports.KuiListingTableRow = KuiListingTableRow;
KuiListingTableRow.propTypes = {
  row: _propTypes2.default.shape({
    id: _propTypes2.default.string,
    cells: _propTypes2.default.arrayOf(_propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.shape({
      content: _propTypes2.default.node,
      align: _propTypes2.default.oneOf([_services.LEFT_ALIGNMENT, _services.RIGHT_ALIGNMENT])
    })]))
  }).isRequired,
  onSelectionChanged: _propTypes2.default.func.isRequired,
  isSelected: _propTypes2.default.bool
};
