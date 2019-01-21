'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiListingTableLoadingPrompt = KuiListingTableLoadingPrompt;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function KuiListingTableLoadingPrompt() {
  return _react2.default.createElement(
    _.KuiEmptyTablePromptPanel,
    null,
    _react2.default.createElement(
      _.KuiTableInfo,
      null,
      'Loading...'
    )
  );
}
