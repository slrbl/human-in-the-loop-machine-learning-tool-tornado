'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TooltipTrigger = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames2 = require('classnames');

var _classnames3 = _interopRequireDefault(_classnames2);

var _tooltip = require('./tooltip');

var _tooltip_constants = require('./tooltip_constants');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TooltipTrigger = exports.TooltipTrigger = function (_React$Component) {
  _inherits(TooltipTrigger, _React$Component);

  function TooltipTrigger(props) {
    _classCallCheck(this, TooltipTrigger);

    var _this = _possibleConstructorReturn(this, (TooltipTrigger.__proto__ || Object.getPrototypeOf(TooltipTrigger)).call(this, props));

    var openOnLoad = props.trigger === 'manual' ? props.display : false;
    _this.state = {
      isVisible: openOnLoad,
      noOverflowPlacement: props.placement
    };
    _this.clickHandler = _this.clickHandler.bind(_this);
    return _this;
  }

  _createClass(TooltipTrigger, [{
    key: 'getPlacement',
    value: function getPlacement() {
      var domNode = _reactDom2.default.findDOMNode(this);
      var tooltipContainer = domNode.getElementsByClassName('euiTooltip__container')[0];
      var userPlacement = this.props.placement;
      var WINDOW_BUFFER = 8;
      return (0, _services.noOverflowPlacement)(domNode, tooltipContainer, userPlacement, WINDOW_BUFFER);
    }
  }, {
    key: 'hoverHandler',
    value: function hoverHandler(e) {
      this.setState({
        isVisible: e.type === 'mouseenter',
        noOverflowPlacement: this.getPlacement()
      });
    }
  }, {
    key: 'clickHandler',
    value: function clickHandler(e, onClick) {
      var _this2 = this;

      this.setState({
        isVisible: true,
        noOverflowPlacement: this.getPlacement()
      });
      onClick(e);
      setTimeout(function () {
        _this2.setState({ isVisible: false });
      }, this.props.clickHideDelay);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var triggerChanged = this.props.trigger !== nextProps.trigger;
      var displayChanged = this.props.display !== nextProps.display;

      if (triggerChanged && nextProps.trigger === 'manual') {
        this.setState({ isVisible: nextProps.display });
      } else if (triggerChanged) {
        this.setState({ isVisible: false });
      } else if (displayChanged) {
        this.setState({ isVisible: nextProps.display });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps, prevState) {
      if (prevState.isVisible && !this.state.isVisible) {
        this.props.onExited();
      } else if (!prevState.isVisible && this.state.isVisible) {
        this.props.onEntered();
      }
    }
  }, {
    key: 'getTriggerHandler',
    value: function getTriggerHandler(trigger, _onClick) {
      var _this3 = this;

      switch (trigger) {
        case 'click':
          return { onClick: function onClick(e) {
              return _this3.clickHandler(e, _onClick);
            } };
        case 'manual':
          return {};
        default:
          return {
            onClick: _onClick,
            onMouseEnter: this.hoverHandler.bind(this),
            onMouseLeave: this.hoverHandler.bind(this)
          };
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _classnames;

      var _props = this.props,
          isSticky = _props.isSticky,
          title = _props.title,
          tooltip = _props.tooltip,
          trigger = _props.trigger,
          className = _props.className,
          clickHideDelay = _props.clickHideDelay,
          onEntered = _props.onEntered,
          onExited = _props.onExited,
          theme = _props.theme,
          size = _props.size,
          onClick = _props.onClick,
          display = _props.display,
          rest = _objectWithoutProperties(_props, ['isSticky', 'title', 'tooltip', 'trigger', 'className', 'clickHideDelay', 'onEntered', 'onExited', 'theme', 'size', 'onClick', 'display']);

      var isVisible = this.state.isVisible;


      var triggerHandler = this.getTriggerHandler(trigger, onClick);

      var newClasses = (0, _classnames3.default)('euiTooltip', className, (_classnames = {
        'tooltip-light': theme === 'light'
      }, _defineProperty(_classnames, 'euiTooltip--' + this.state.noOverflowPlacement, this.state.noOverflowPlacement !== 'top'), _defineProperty(_classnames, 'euiTooltip--' + trigger, trigger !== 'hover'), _classnames));
      var newProps = _extends({
        className: newClasses
      }, triggerHandler, rest);
      var tooltipProps = { isSticky: isSticky, size: size, isVisible: isVisible, title: title };

      return _react2.default.createElement(
        'div',
        newProps,
        this.props.children,
        _react2.default.createElement(
          _tooltip.Tooltip,
          tooltipProps,
          tooltip
        )
      );
    }
  }]);

  return TooltipTrigger;
}(_react2.default.Component);

TooltipTrigger.propTypes = {
  display: _propTypes2.default.bool,
  title: _propTypes2.default.string,
  tooltip: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.object]).isRequired,
  placement: _propTypes2.default.oneOf(['left', 'right', 'bottom', 'top']),
  trigger: _propTypes2.default.oneOf(['manual', 'hover', 'click']),
  clickHideDelay: _propTypes2.default.number,
  onClick: _propTypes2.default.func,
  onEntered: _propTypes2.default.func,
  onExited: _propTypes2.default.func,
  theme: _propTypes2.default.oneOf(['dark', 'light']),
  size: _propTypes2.default.oneOf([_tooltip_constants.SIZE.AUTO, _tooltip_constants.SIZE.SMALL, _tooltip_constants.SIZE.MEDIUM, _tooltip_constants.SIZE.LARGE]),
  isSticky: _propTypes2.default.bool
};
TooltipTrigger.defaultProps = {
  display: false,
  placement: 'top',
  trigger: 'hover',
  clickHideDelay: 1000,
  onClick: function onClick() {},
  onEntered: function onEntered() {},
  onExited: function onExited() {},
  theme: 'dark',
  size: _tooltip_constants.SIZE.AUTO,
  isSticky: false
};