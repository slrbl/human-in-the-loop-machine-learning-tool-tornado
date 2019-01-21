'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.KuiListingTableDeleteButton = KuiListingTableDeleteButton;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _ = require('../../');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function KuiListingTableDeleteButton(_ref) {
  let onDelete = _ref.onDelete,
      props = _objectWithoutProperties(_ref, ['onDelete']);

  return _react2.default.createElement(_.KuiButton, _extends({}, props, {
    buttonType: 'danger',
    onClick: onDelete,
    icon: _react2.default.createElement(_.KuiButtonIcon, { type: 'delete' })
  }));
}

KuiListingTableDeleteButton.propTypes = {
  onDelete: _propTypes2.default.func
};
