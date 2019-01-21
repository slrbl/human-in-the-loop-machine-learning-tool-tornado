'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiPopover = exports.ANCHOR_POSITIONS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _focusTrapReact = require('focus-trap-react');

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _tabbable = require('tabbable');

var _tabbable2 = _interopRequireDefault(_tabbable);

var _services = require('../../services');

var _outside_click_detector = require('../outside_click_detector');

var _panel = require('../panel');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var anchorPositionToClassNameMap = {
  'upCenter': 'euiPopover--anchorUpCenter',
  'upLeft': 'euiPopover--anchorUpLeft',
  'upRight': 'euiPopover--anchorUpRight',
  'downCenter': 'euiPopover--anchorDownCenter',
  'downLeft': 'euiPopover--anchorDownLeft',
  'downRight': 'euiPopover--anchorDownRight',
  'leftCenter': 'euiPopover--anchorLeftCenter',
  'leftUp': 'euiPopover--anchorLeftUp',
  'leftDown': 'euiPopover--anchorLeftDown',
  'rightCenter': 'euiPopover--anchorRightCenter',
  'rightUp': 'euiPopover--anchorRightUp',
  'rightDown': 'euiPopover--anchorRightDown'
};

var ANCHOR_POSITIONS = exports.ANCHOR_POSITIONS = Object.keys(anchorPositionToClassNameMap);

var EuiPopover = exports.EuiPopover = function (_Component) {
  _inherits(EuiPopover, _Component);

  function EuiPopover(props) {
    _classCallCheck(this, EuiPopover);

    var _this = _possibleConstructorReturn(this, (EuiPopover.__proto__ || Object.getPrototypeOf(EuiPopover)).call(this, props));

    _this.onKeyDown = function (e) {
      if (e.keyCode === _services.cascadingMenuKeyCodes.ESCAPE) {
        _this.props.closePopover();
      }
    };

    _this.panelRef = function (node) {
      if (_this.props.ownFocus) {
        _this.panel = node;
      }
    };

    _this.closingTransitionTimeout = undefined;

    _this.state = {
      isClosing: false,
      isOpening: false
    };
    return _this;
  }

  _createClass(EuiPopover, [{
    key: 'updateFocus',
    value: function updateFocus() {
      var _this2 = this;

      // Wait for the DOM to update.
      window.requestAnimationFrame(function () {
        if (!_this2.panel) {
          return;
        }

        // If we've already focused on something inside the panel, everything's fine.
        if (_this2.panel.contains(document.activeElement)) {
          return;
        }

        // Otherwise let's focus the first tabbable item and expedite input from the user.
        var tabbableItems = (0, _tabbable2.default)(_this2.panel);
        if (tabbableItems.length) {
          tabbableItems[0].focus();
        }
      });
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFocus();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      var _this3 = this;

      // The popover is being opened.
      if (!this.props.isOpen && nextProps.isOpen) {
        clearTimeout(this.closingTransitionTimeout);
        // We need to set this state a beat after the render takes place, so that the CSS
        // transition can take effect.
        window.requestAnimationFrame(function () {
          _this3.setState({
            isOpening: true
          });
        });
      }

      // The popover is being closed.
      if (this.props.isOpen && !nextProps.isOpen) {
        // If the user has just closed the popover, queue up the removal of the content after the
        // transition is complete.
        this.setState({
          isClosing: true,
          isOpening: false
        });

        this.closingTransitionTimeout = setTimeout(function () {
          _this3.setState({
            isClosing: false
          });
        }, 250);
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateFocus();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearTimeout(this.closingTransitionTimeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          anchorPosition = _props.anchorPosition,
          button = _props.button,
          isOpen = _props.isOpen,
          ownFocus = _props.ownFocus,
          withTitle = _props.withTitle,
          children = _props.children,
          id = _props.id,
          className = _props.className,
          closePopover = _props.closePopover,
          panelClassName = _props.panelClassName,
          panelPaddingSize = _props.panelPaddingSize,
          rest = _objectWithoutProperties(_props, ['anchorPosition', 'button', 'isOpen', 'ownFocus', 'withTitle', 'children', 'id', 'className', 'closePopover', 'panelClassName', 'panelPaddingSize']);

      var classes = (0, _classnames2.default)('euiPopover', anchorPositionToClassNameMap[anchorPosition], className, {
        'euiPopover-isOpen': this.state.isOpening,
        'euiPopover--withTitle': withTitle
      });

      var panelClasses = (0, _classnames2.default)('euiPopover__panel', panelClassName);

      var panel = void 0;

      if (isOpen || this.state.isClosing) {
        var tabIndex = void 0;
        var initialFocus = void 0;

        if (ownFocus) {
          tabIndex = '0';
          initialFocus = function initialFocus() {
            return _this4.panel;
          };
        }

        panel = _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              clickOutsideDeactivates: true,
              initialFocus: initialFocus
            }
          },
          _react2.default.createElement(
            _panel.EuiPanel,
            {
              panelRef: this.panelRef,
              className: panelClasses,
              paddingSize: panelPaddingSize,
              tabIndex: tabIndex,
              hasShadow: true,
              id: id
            },
            children
          )
        );
      }

      return _react2.default.createElement(
        _outside_click_detector.EuiOutsideClickDetector,
        { onOutsideClick: closePopover },
        _react2.default.createElement(
          'div',
          _extends({
            className: classes,
            onKeyDown: this.onKeyDown
          }, rest),
          (0, _react.cloneElement)(button, {
            'aria-controls': id,
            'aria-expanded': !!isOpen
          }),
          panel
        )
      );
    }
  }]);

  return EuiPopover;
}(_react.Component);

EuiPopover.propTypes = {
  id: _propTypes2.default.string.isRequired,
  isOpen: _propTypes2.default.bool,
  ownFocus: _propTypes2.default.bool,
  withTitle: _propTypes2.default.bool,
  closePopover: _propTypes2.default.func.isRequired,
  button: _propTypes2.default.node.isRequired,
  children: _propTypes2.default.node,
  anchorPosition: _propTypes2.default.oneOf(ANCHOR_POSITIONS),
  panelClassName: _propTypes2.default.string,
  panelPaddingSize: _propTypes2.default.oneOf(_panel.SIZES)
};

EuiPopover.defaultProps = {
  isOpen: false,
  ownFocus: false,
  anchorPosition: 'downCenter',
  panelPaddingSize: 'm'
};