'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiListingTableToolBarFooter = KuiListingTableToolBarFooter;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function KuiListingTableToolBarFooter({ pager, itemsSelectedCount }) {
  const renderText = () => {
    if (itemsSelectedCount === 1) {
      return '1 item selected';
    }

    return `${itemsSelectedCount} items selected`;
  };

  let pagerSection;

  if (pager) {
    pagerSection = _react2.default.createElement(
      _.KuiToolBarFooterSection,
      null,
      pager
    );
  }

  return _react2.default.createElement(
    _.KuiToolBarFooter,
    null,
    _react2.default.createElement(
      _.KuiToolBarFooterSection,
      null,
      _react2.default.createElement(
        _.KuiToolBarText,
        null,
        renderText()
      )
    ),
    pagerSection
  );
}

KuiListingTableToolBarFooter.propTypes = {
  pager: _propTypes2.default.node,
  itemsSelectedCount: _propTypes2.default.number
};
