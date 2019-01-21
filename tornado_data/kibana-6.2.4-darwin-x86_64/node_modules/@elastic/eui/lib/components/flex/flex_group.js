'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiFlexGroup = exports.JUSTIFY_CONTENTS = exports.ALIGN_ITEMS = exports.GUTTER_SIZES = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var gutterSizeToClassNameMap = {
  none: null,
  xs: 'euiFlexGroup--gutterExtraSmall',
  s: 'euiFlexGroup--gutterSmall',
  m: 'euiFlexGroup--gutterMedium',
  l: 'euiFlexGroup--gutterLarge',
  xl: 'euiFlexGroup--gutterExtraLarge'
};

var GUTTER_SIZES = exports.GUTTER_SIZES = Object.keys(gutterSizeToClassNameMap);

var alignItemsToClassNameMap = {
  stretch: null,
  flexStart: 'euiFlexGroup--alignItemsFlexStart',
  flexEnd: 'euiFlexGroup--alignItemsFlexEnd',
  center: 'euiFlexGroup--alignItemsCenter'
};

var ALIGN_ITEMS = exports.ALIGN_ITEMS = Object.keys(alignItemsToClassNameMap);

var justifyContentToClassNameMap = {
  flexStart: null,
  flexEnd: 'euiFlexGroup--justifyContentFlexEnd',
  center: 'euiFlexGroup--justifyContentCenter',
  spaceBetween: 'euiFlexGroup--justifyContentSpaceBetween',
  spaceAround: 'euiFlexGroup--justifyContentSpaceAround',
  spaceEvenly: 'euiFlexGroup--justifyContentSpaceEvenly'
};

var JUSTIFY_CONTENTS = exports.JUSTIFY_CONTENTS = Object.keys(justifyContentToClassNameMap);

var EuiFlexGroup = function EuiFlexGroup(_ref) {
  var children = _ref.children,
      className = _ref.className,
      gutterSize = _ref.gutterSize,
      alignItems = _ref.alignItems,
      responsive = _ref.responsive,
      justifyContent = _ref.justifyContent,
      wrap = _ref.wrap,
      Component = _ref.component,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'gutterSize', 'alignItems', 'responsive', 'justifyContent', 'wrap', 'component']);

  var classes = (0, _classnames2.default)('euiFlexGroup', gutterSizeToClassNameMap[gutterSize], alignItemsToClassNameMap[alignItems], justifyContentToClassNameMap[justifyContent], {
    'euiFlexGroup--responsive': responsive,
    'euiFlexGroup--wrap': wrap
  }, className);

  return _react2.default.createElement(
    Component,
    _extends({
      className: classes
    }, rest),
    children
  );
};

exports.EuiFlexGroup = EuiFlexGroup;
EuiFlexGroup.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  responsive: _propTypes2.default.bool,
  gutterSize: _propTypes2.default.oneOf(GUTTER_SIZES),
  alignItems: _propTypes2.default.oneOf(ALIGN_ITEMS),
  justifyContent: _propTypes2.default.oneOf(JUSTIFY_CONTENTS),
  component: _propTypes2.default.oneOf(['div', 'span']),
  wrap: _propTypes2.default.bool
};

EuiFlexGroup.defaultProps = {
  gutterSize: 'l',
  alignItems: 'stretch',
  responsive: true,
  justifyContent: 'flexStart',
  component: 'div',
  wrap: false
};