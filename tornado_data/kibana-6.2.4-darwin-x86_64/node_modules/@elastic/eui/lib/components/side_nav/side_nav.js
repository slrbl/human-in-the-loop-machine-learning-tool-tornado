'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiSideNav = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _icon = require('../icon');

var _side_nav_item = require('./side_nav_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EuiSideNav = exports.EuiSideNav = function (_Component) {
  _inherits(EuiSideNav, _Component);

  function EuiSideNav() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, EuiSideNav);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = EuiSideNav.__proto__ || Object.getPrototypeOf(EuiSideNav)).call.apply(_ref, [this].concat(args))), _this), _this.isItemOpen = function (item) {
      // Of course a selected item is open.
      if (item.isSelected) {
        return true;
      }

      // The item has to be open if it has a child that's open.
      if (item.items) {
        return item.items.some(_this.isItemOpen);
      }
    }, _this.renderTree = function (items) {
      var depth = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var renderItem = _this.props.renderItem;


      return items.map(function (item) {
        var id = item.id,
            name = item.name,
            isSelected = item.isSelected,
            childItems = item.items,
            icon = item.icon,
            onClick = item.onClick,
            href = item.href,
            rest = _objectWithoutProperties(item, ['id', 'name', 'isSelected', 'items', 'icon', 'onClick', 'href']);

        // Root items are always open.


        var isOpen = depth === 0 ? true : _this.isItemOpen(item);

        var renderedItems = void 0;

        if (childItems) {
          renderedItems = _this.renderTree(childItems, depth + 1);
        }

        return _react2.default.createElement(
          _side_nav_item.EuiSideNavItem,
          _extends({
            isOpen: isOpen,
            isSelected: isSelected,
            isParent: !!childItems,
            icon: icon,
            onClick: onClick,
            href: href,
            items: renderedItems,
            key: id,
            depth: depth,
            renderItem: renderItem
          }, rest),
          name
        );
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(EuiSideNav, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          className = _props.className,
          items = _props.items,
          toggleOpenOnMobile = _props.toggleOpenOnMobile,
          isOpenOnMobile = _props.isOpenOnMobile,
          mobileTitle = _props.mobileTitle,
          renderItem = _props.renderItem,
          rest = _objectWithoutProperties(_props, ['className', 'items', 'toggleOpenOnMobile', 'isOpenOnMobile', 'mobileTitle', 'renderItem']);

      var classes = (0, _classnames2.default)('euiSideNav', className, {
        'euiSideNav-isOpenMobile': isOpenOnMobile
      });

      var nav = this.renderTree(items);

      return _react2.default.createElement(
        'nav',
        _extends({
          className: classes
        }, rest),
        _react2.default.createElement(
          'button',
          {
            type: 'button',
            className: 'euiSideNav__mobileToggle euiLink',
            onClick: toggleOpenOnMobile
          },
          _react2.default.createElement(
            'span',
            { className: 'euiSideNav__mobileWrap' },
            _react2.default.createElement(
              'span',
              { className: 'euiSideNav__mobileTitle' },
              mobileTitle
            ),
            _react2.default.createElement(_icon.EuiIcon, {
              className: 'euiSideNav__mobileIcon',
              type: 'apps',
              size: 'm',
              'aria-hidden': 'true'
            })
          )
        ),
        _react2.default.createElement(
          'div',
          { className: 'euiSideNav__content' },
          nav
        )
      );
    }
  }]);

  return EuiSideNav;
}(_react.Component);

EuiSideNav.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  toggleOpenOnMobile: _propTypes2.default.func,
  isOpenOnMobile: _propTypes2.default.bool,
  mobileTitle: _propTypes2.default.node,
  items: _propTypes2.default.array,
  renderItem: _propTypes2.default.func
};

EuiSideNav.defaultProps = {
  items: []
};