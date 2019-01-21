'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiTablePagination = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _button = require('../../button');

var _context_menu = require('../../context_menu');

var _flex = require('../../flex');

var _pagination = require('../../pagination');

var _popover = require('../../popover');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiTablePagination = exports.EuiTablePagination = function (_Component) {
  _inherits(EuiTablePagination, _Component);

  function EuiTablePagination(props) {
    _classCallCheck(this, EuiTablePagination);

    var _this = _possibleConstructorReturn(this, (EuiTablePagination.__proto__ || Object.getPrototypeOf(EuiTablePagination)).call(this, props));

    _this.onButtonClick = function () {
      _this.setState({
        isPopoverOpen: !_this.state.isPopoverOpen
      });
    };

    _this.closePopover = function () {
      _this.setState({
        isPopoverOpen: false
      });
    };

    _this.state = {
      isPopoverOpen: false
    };
    return _this;
  }

  _createClass(EuiTablePagination, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          activePage = _props.activePage,
          itemsPerPage = _props.itemsPerPage,
          itemsPerPageOptions = _props.itemsPerPageOptions,
          onChangeItemsPerPage = _props.onChangeItemsPerPage,
          onChangePage = _props.onChangePage,
          pageCount = _props.pageCount;


      var button = _react2.default.createElement(
        _button.EuiButtonEmpty,
        {
          size: 's',
          color: 'text',
          iconType: 'arrowDown',
          iconSide: 'right',
          onClick: this.onButtonClick
        },
        'Rows per page: ' + itemsPerPage
      );

      var items = itemsPerPageOptions.map(function (itemsPerPageOption) {
        return _react2.default.createElement(
          _context_menu.EuiContextMenuItem,
          {
            key: itemsPerPageOption,
            icon: itemsPerPageOption === itemsPerPage ? 'check' : 'empty',
            onClick: function onClick() {
              _this2.closePopover();onChangeItemsPerPage(itemsPerPageOption);
            }
          },
          itemsPerPageOption + ' rows'
        );
      });

      return _react2.default.createElement(
        _flex.EuiFlexGroup,
        { justifyContent: 'spaceBetween', alignItems: 'center' },
        _react2.default.createElement(
          _flex.EuiFlexItem,
          { grow: false },
          _react2.default.createElement(
            _popover.EuiPopover,
            {
              id: 'customizablePagination',
              button: button,
              isOpen: this.state.isPopoverOpen,
              closePopover: this.closePopover,
              panelPaddingSize: 'none',
              withTitle: true,
              anchorPosition: 'upRight'
            },
            _react2.default.createElement(_context_menu.EuiContextMenuPanel, {
              items: items
            })
          )
        ),
        _react2.default.createElement(
          _flex.EuiFlexItem,
          { grow: false },
          _react2.default.createElement(_pagination.EuiPagination, {
            pageCount: pageCount,
            activePage: activePage,
            onPageClick: onChangePage
          })
        )
      );
    }
  }]);

  return EuiTablePagination;
}(_react.Component);

EuiTablePagination.propTypes = {
  activePage: _propTypes2.default.number,
  itemsPerPage: _propTypes2.default.number,
  itemsPerPageOptions: _propTypes2.default.arrayOf(_propTypes2.default.number),
  onChangeItemsPerPage: _propTypes2.default.func,
  onChangePage: _propTypes2.default.func,
  pageCount: _propTypes2.default.number
};

EuiTablePagination.defaultProps = {
  itemsPerPage: 50,
  itemsPerPageOptions: [10, 20, 50, 100]
};