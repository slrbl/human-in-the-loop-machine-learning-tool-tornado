/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/
'use strict';

exports.__esModule = true;
exports.DropdownItem = exports.Dropdown = undefined;

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _objectWithoutProperties2 = require('babel-runtime/helpers/objectWithoutProperties');

var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _mixins = require('../mixins');

var _mixins2 = _interopRequireDefault(_mixins);

var _scrim_mixin = require('../mixins/mixins/scrim_mixin');

var _scrim_mixin2 = _interopRequireDefault(_scrim_mixin);

var _transition_mixin = require('../mixins/mixins/transition_mixin');

var _transition_mixin2 = _interopRequireDefault(_transition_mixin);

var _iconography = require('../iconography');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var defaultToggleNode = function defaultToggleNode(showIcon, icon) {
  if (showIcon) return _react2.default.createElement(_iconography.Icon, { src: icon, className: 'icon-toggle' });
};

var Dropdown = exports.Dropdown = function (_mixin$with) {
  (0, _inherits3.default)(Dropdown, _mixin$with);

  function Dropdown(props, context) {
    (0, _classCallCheck3.default)(this, Dropdown);

    var _this = (0, _possibleConstructorReturn3.default)(this, _mixin$with.call(this, props, context));

    _this.click = function (event) {
      _this.setState({ open: !_this.state.open });
      _this.props.onClick && _this.props.onClick(event);
    };

    _this.handleSplitClick = function (event) {
      var _this$props = _this.props,
          href = _this$props.href,
          disabled = _this$props.disabled,
          onSelect = _this$props.onSelect,
          onSplitClick = _this$props.onSplitClick;

      if (disabled) return;

      if (!href) {
        event.preventDefault();
        onSplitClick && onSplitClick(event);
      }

      onSelect && onSelect(event);
    };

    _this.scrimClick = function () {
      return _this.setState({ open: false });
    };

    _this.menuClick = function () {
      if (!_this.props.closeOnMenuClick) return;
      _this.setState({ open: false });
    };

    _this.state = {
      open: false
    };
    return _this;
  }

  Dropdown.prototype.componentDidMount = function componentDidMount() {
    _mixin$with.prototype.componentDidMount.call(this);
    require('../../css/dropdowns');
  };

  Dropdown.prototype.render = function render() {
    var _props = this.props,
        blockingScrim = _props.blockingScrim,
        border = _props.border,
        buttonAriaLabel = _props.buttonAriaLabel,
        buttonClassName = _props.buttonClassName,
        splitClassName = _props.splitClassName,
        children = _props.children,
        className = _props.className,
        closeOnMenuClick = _props.closeOnMenuClick,
        disableScrim = _props.disableScrim,
        showIcon = _props.showIcon,
        flat = _props.flat,
        link = _props.link,
        labelAriaLabel = _props.labelAriaLabel,
        menuAlign = _props.menuAlign,
        size = _props.size,
        href = _props.href,
        icon = _props.icon,
        onClick = _props.onClick,
        onSplitClick = _props.onSplitClick,
        onEntered = _props.onEntered,
        onExited = _props.onExited,
        split = _props.split,
        title = _props.title,
        toggle = _props.toggle,
        floatMenu = _props.floatMenu,
        scroll = _props.scroll,
        props = (0, _objectWithoutProperties3.default)(_props, ['blockingScrim', 'border', 'buttonAriaLabel', 'buttonClassName', 'splitClassName', 'children', 'className', 'closeOnMenuClick', 'disableScrim', 'showIcon', 'flat', 'link', 'labelAriaLabel', 'menuAlign', 'size', 'href', 'icon', 'onClick', 'onSplitClick', 'onEntered', 'onExited', 'split', 'title', 'toggle', 'floatMenu', 'scroll']);
    var open = this.state.open;

    var buttonStyleClasses = (0, _classnames2.default)('dropdown-toggle', buttonClassName);
    var noTitle = typeof title === 'undefined' || title === null || title.length === 0;

    var forceIcon = noTitle || split;
    var iconVisible = forceIcon || showIcon;
    var toggleNode = toggle ? toggle : defaultToggleNode(iconVisible, icon);
    var menuVisibility = open ? 'dropdown-open' : 'dropdown-closed';

    var dropdownClasses = (0, _classnames2.default)('dropdown', {
      'dropdown-flat': flat,
      'dropdown-split': split,
      'dropdown-link': link,
      'dropdown-lg': size === 'large',
      'dropdown-sm': size === 'small',
      'dropdown-icon-only': !split && noTitle
    }, menuVisibility, className);

    var dropdownMenuClasses = (0, _classnames2.default)('dropdown-menu', {
      'dropdown-border': border,
      'dropdown-menu-right': menuAlign === 'right',
      'dropdown-menu-left': menuAlign === 'left',
      'dropdown-menu-float': split || flat || link || floatMenu || noTitle || menuAlign !== 'none',
      'dropdown-menu-scroll': scroll
    });
    var dropdownOptions = _react2.default.createElement(
      'div',
      { className: dropdownMenuClasses },
      _react2.default.createElement(
        'ul',
        { 'aria-label': 'submenu', onClick: this.menuClick },
        children
      )
    );

    var splitProps = { href: href, 'aria-label': labelAriaLabel };

    return _react2.default.createElement(
      'div',
      (0, _extends3.default)({ className: dropdownClasses }, props),
      _react2.default.createElement(
        'button',
        { type: 'button', onClick: this.click, className: buttonStyleClasses, 'aria-haspopup': 'true', 'aria-label': buttonAriaLabel },
        !split && title
      ),
      toggleNode,
      split && _react2.default.createElement(
        'a',
        (0, _extends3.default)({ className: (0, _classnames2.default)('dropdown-label', splitClassName) }, (0, _extends3.default)({}, splitProps), { onClick: this.handleSplitClick }),
        title
      ),
      blockingScrim && open && !disableScrim && _react2.default.createElement('div', { className: 'scrim', onClick: this.scrimClick }),
      dropdownOptions
    );
  };

  return Dropdown;
}((0, _mixins2.default)(_react2.default.Component).with(_scrim_mixin2.default, _transition_mixin2.default));

Dropdown.propTypes = {
  blockingScrim: _propTypes2.default.bool,
  border: _propTypes2.default.bool,
  buttonAriaLabel: _propTypes2.default.string,
  buttonClassName: _propTypes2.default.string,
  splitClassName: _propTypes2.default.string,
  closeOnMenuClick: _propTypes2.default.bool,
  disableScrim: _propTypes2.default.bool,
  flat: _propTypes2.default.bool,
  floatMenu: _propTypes2.default.bool,
  href: _propTypes2.default.string,
  icon: _propTypes2.default.string,
  link: _propTypes2.default.bool,
  labelAriaLabel: _propTypes2.default.string,
  menuAlign: _propTypes2.default.oneOf(['none', 'left', 'right']),
  onClick: _propTypes2.default.func,
  onSplitClick: _propTypes2.default.func,
  onEntered: _propTypes2.default.func,
  onExited: _propTypes2.default.func,
  onSelect: _propTypes2.default.func,
  title: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.object]),
  toggle: _propTypes2.default.node,
  scroll: _propTypes2.default.bool,
  showIcon: _propTypes2.default.bool,
  size: _propTypes2.default.oneOf(['normal', 'large', 'small']),
  split: _propTypes2.default.bool
};
Dropdown.defaultProps = {
  blockingScrim: false,
  closeOnMenuClick: true,
  disableScrim: false,
  icon: 'chevron_down',
  menuAlign: 'none',
  scroll: false,
  showIcon: true,
  size: 'normal'
};

var DropdownItem = exports.DropdownItem = function (_React$Component) {
  (0, _inherits3.default)(DropdownItem, _React$Component);

  function DropdownItem() {
    var _temp, _this2, _ret;

    (0, _classCallCheck3.default)(this, DropdownItem);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this2 = (0, _possibleConstructorReturn3.default)(this, _React$Component.call.apply(_React$Component, [this].concat(args))), _this2), _this2.handleClick = function (event) {
      var _this2$props = _this2.props,
          href = _this2$props.href,
          disabled = _this2$props.disabled,
          onClick = _this2$props.onClick,
          onSelect = _this2$props.onSelect,
          eventKey = _this2$props.eventKey;

      if (disabled) return;

      if (!href) {
        event.preventDefault();
      }

      if (onSelect) {
        onSelect(event, eventKey);
      }

      if (onClick) {
        onClick(event);
      }
    }, _temp), (0, _possibleConstructorReturn3.default)(_this2, _ret);
  }

  DropdownItem.prototype.componentDidMount = function componentDidMount() {
    require('../../css/dropdowns');
  };

  DropdownItem.prototype.render = function render() {
    var _props2 = this.props,
        children = _props2.children,
        className = _props2.className,
        eventKey = _props2.eventKey,
        style = _props2.style,
        href = _props2.href,
        header = _props2.header,
        divider = _props2.divider,
        disabled = _props2.disabled,
        onClick = _props2.onClick,
        onSelect = _props2.onSelect,
        anchorProps = (0, _objectWithoutProperties3.default)(_props2, ['children', 'className', 'eventKey', 'style', 'href', 'header', 'divider', 'disabled', 'onClick', 'onSelect']);


    if (header) return _react2.default.createElement(
      'li',
      { role: 'heading', className: 'dropdown-header' },
      children
    );
    if (divider) return _react2.default.createElement('li', { role: 'separator', className: 'divider' });

    var anchor = href ? _react2.default.createElement(
      'a',
      (0, _extends3.default)({ href: href, disabled: disabled }, anchorProps),
      children
    ) : children;
    var disabledClass = disabled ? 'disabled' : '';
    var dropdownItemClass = (0, _classnames2.default)(className, disabledClass);

    return _react2.default.createElement(
      'li',
      (0, _extends3.default)({ style: style }, { className: dropdownItemClass, onClick: this.handleClick }),
      anchor
    );
  };

  return DropdownItem;
}(_react2.default.Component);

DropdownItem.propTypes = {
  className: _propTypes2.default.string,
  style: _propTypes2.default.object,
  href: _propTypes2.default.string,
  header: _propTypes2.default.bool,
  divider: _propTypes2.default.bool,
  disabled: _propTypes2.default.bool,
  eventKey: _propTypes2.default.string,
  onSelect: _propTypes2.default.func,
  onClick: _propTypes2.default.func
};