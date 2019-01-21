'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFormControlLayout = exports.ICON_SIDES = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../../icon');

var _loading = require('../../loading');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var iconSideToClassNameMap = {
  left: '',
  right: 'euiFormControlLayout__icon--right'
};

var ICON_SIDES = exports.ICON_SIDES = Object.keys(iconSideToClassNameMap);

var EuiFormControlLayout = exports.EuiFormControlLayout = function EuiFormControlLayout(_ref) {
  var children = _ref.children,
      icon = _ref.icon,
      fullWidth = _ref.fullWidth,
      iconSide = _ref.iconSide,
      isLoading = _ref.isLoading,
      className = _ref.className;


  var classes = (0, _classnames2.default)('euiFormControlLayout', {
    'euiFormControlLayout--fullWidth': fullWidth
  }, className);

  var optionalLoader = void 0;
  if (isLoading) {
    optionalLoader = _react2.default.createElement(_loading.EuiLoadingSpinner, { size: 'm', className: 'euiFormControlLayout__loading' });
  }

  var optionalIcon = void 0;
  if (icon) {
    var iconClasses = (0, _classnames2.default)('euiFormControlLayout__icon', iconSideToClassNameMap[iconSide]);

    optionalIcon = _react2.default.createElement(_icon.EuiIcon, {
      className: iconClasses,
      type: icon,
      size: 'm'
    });
  }

  return _react2.default.createElement(
    'div',
    { className: classes },
    children,
    optionalIcon,
    optionalLoader
  );
};

EuiFormControlLayout.propTypes = {
  children: _propTypes2.default.node,
  icon: _propTypes2.default.string,
  fullWidth: _propTypes2.default.bool,
  iconSide: _propTypes2.default.oneOf(ICON_SIDES),
  isLoading: _propTypes2.default.bool,
  className: _propTypes2.default.string
};

EuiFormControlLayout.defaultProps = {
  iconSide: 'left',
  isLoading: false
};