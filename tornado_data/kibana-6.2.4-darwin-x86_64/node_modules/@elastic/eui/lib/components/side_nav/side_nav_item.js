'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSideNavItem = undefined;

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

var defaultRenderItem = function defaultRenderItem(_ref) {
  var href = _ref.href,
      onClick = _ref.onClick,
      className = _ref.className,
      children = _ref.children,
      rest = _objectWithoutProperties(_ref, ['href', 'onClick', 'className', 'children']);

  if (href) {
    return _react2.default.createElement(
      'a',
      _extends({
        className: className,
        href: href
      }, rest),
      children
    );
  }

  return _react2.default.createElement(
    'button',
    _extends({
      className: className,
      onClick: onClick
    }, rest),
    children
  );
};

var EuiSideNavItem = function EuiSideNavItem(_ref2) {
  var isOpen = _ref2.isOpen,
      isSelected = _ref2.isSelected,
      isParent = _ref2.isParent,
      icon = _ref2.icon,
      onClick = _ref2.onClick,
      href = _ref2.href,
      items = _ref2.items,
      children = _ref2.children,
      depth = _ref2.depth,
      _ref2$renderItem = _ref2.renderItem,
      renderItem = _ref2$renderItem === undefined ? defaultRenderItem : _ref2$renderItem,
      rest = _objectWithoutProperties(_ref2, ['isOpen', 'isSelected', 'isParent', 'icon', 'onClick', 'href', 'items', 'children', 'depth', 'renderItem']);

  var childItems = void 0;

  if (isOpen) {
    childItems = _react2.default.createElement(
      'div',
      { className: 'euiSideNavItem__items' },
      items
    );
  }

  var buttonIcon = void 0;

  if (icon) {
    buttonIcon = (0, _react.cloneElement)(icon, {
      className: 'euiSideNavItemButton__icon'
    });
  }

  var classes = (0, _classnames2.default)('euiSideNavItem', {
    'euiSideNavItem--root': depth === 0,
    'euiSideNavItem--rootIcon': depth === 0 && icon,
    'euiSideNavItem--trunk': depth === 1,
    'euiSideNavItem--branch': depth > 1
  });

  var buttonClasses = (0, _classnames2.default)('euiSideNavItemButton', {
    'euiSideNavItemButton-isOpen': depth > 0 && isOpen && !isSelected,
    'euiSideNavItemButton-isSelected': isSelected
  });

  var caret = void 0;

  if (depth > 0 && isParent && !isOpen && !isSelected) {
    caret = _react2.default.createElement(_icon.EuiIcon, { type: 'arrowDown', color: 'subdued', size: 's' });
  }

  var buttonContent = _react2.default.createElement(
    'span',
    { className: 'euiSideNavItemButton__content' },
    buttonIcon,
    _react2.default.createElement(
      'span',
      { className: 'euiSideNavItemButton__label' },
      children
    ),
    caret
  );

  return _react2.default.createElement(
    'div',
    { className: classes },
    renderItem(_extends({ href: href, onClick: onClick, className: buttonClasses, children: buttonContent }, rest)),
    childItems
  );
};

exports.EuiSideNavItem = EuiSideNavItem;
EuiSideNavItem.propTypes = {
  isOpen: _propTypes2.default.bool,
  isSelected: _propTypes2.default.bool,
  isParent: _propTypes2.default.bool,
  icon: _propTypes2.default.node,
  onClick: _propTypes2.default.func,
  href: _propTypes2.default.string,
  items: _propTypes2.default.node,
  children: _propTypes2.default.node,
  depth: _propTypes2.default.number,
  renderItem: _propTypes2.default.func
};