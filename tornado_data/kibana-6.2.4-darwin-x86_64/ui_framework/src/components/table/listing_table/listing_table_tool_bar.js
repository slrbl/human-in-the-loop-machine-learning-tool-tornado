'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiListingTableToolBar = KuiListingTableToolBar;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function KuiListingTableToolBar({ pager, actions, onFilter, filter }) {
  let actionsSection;

  if (actions) {
    actionsSection = _react2.default.createElement(
      _.KuiToolBarSection,
      null,
      actions
    );
  }

  let pagerSection;

  if (pager) {
    pagerSection = _react2.default.createElement(
      _.KuiToolBarSection,
      null,
      pager
    );
  }

  return _react2.default.createElement(
    _.KuiToolBar,
    null,
    _react2.default.createElement(_.KuiToolBarSearchBox, { onFilter: onFilter, filter: filter }),
    actionsSection,
    pagerSection
  );
}

KuiListingTableToolBar.propTypes = {
  filter: _propTypes2.default.string,
  onFilter: _propTypes2.default.func.isRequired,
  pager: _propTypes2.default.node,
  actions: _propTypes2.default.node
};
