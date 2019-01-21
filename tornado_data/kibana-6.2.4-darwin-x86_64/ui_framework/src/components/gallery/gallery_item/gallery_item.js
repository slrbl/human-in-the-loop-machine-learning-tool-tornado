'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiGalleryItem = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const checkHrefAndOnClick = (props, propName, componentName) => {
  if (props.href && props.onClick) {
    throw new Error(`${componentName} must either specify an href property (if it should be a link) ` + `or an onClick property (if it should be a button), but not both.`);
  }
};

const KuiGalleryItem = (_ref) => {
  let children = _ref.children,
      className = _ref.className,
      href = _ref.href,
      rest = _objectWithoutProperties(_ref, ['children', 'className', 'href']);

  const classes = (0, _classnames2.default)('kuiGalleryItem', className);
  if (href) {
    return _react2.default.createElement(
      'a',
      _extends({
        className: classes,
        href: href
      }, rest),
      children
    );
  } else {
    return _react2.default.createElement(
      'button',
      _extends({
        className: classes
      }, rest),
      children
    );
  }
};
exports.KuiGalleryItem = KuiGalleryItem;
KuiGalleryItem.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  href: checkHrefAndOnClick,
  onClick: _propTypes2.default.func
};
