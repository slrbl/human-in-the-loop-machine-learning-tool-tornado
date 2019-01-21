'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiHeaderLogo = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var EuiHeaderLogo = function EuiHeaderLogo(_ref) {
  var iconType = _ref.iconType,
      iconTitle = _ref.iconTitle,
      href = _ref.href,
      className = _ref.className,
      rest = _objectWithoutProperties(_ref, ['iconType', 'iconTitle', 'href', 'className']);

  var classes = (0, _classnames2.default)('euiHeaderLogo', className);

  return _react2.default.createElement(
    'a',
    _extends({ href: href, className: classes }, rest),
    _react2.default.createElement(_icon.EuiIcon, {
      className: 'euiHeaderLogo__icon',
      size: 'xl',
      type: iconType,
      title: iconTitle
    })
  );
};

exports.EuiHeaderLogo = EuiHeaderLogo;
EuiHeaderLogo.propTypes = {
  href: _propTypes2.default.string
};

EuiHeaderLogo.defaultProps = {
  iconType: 'logoElastic'
};