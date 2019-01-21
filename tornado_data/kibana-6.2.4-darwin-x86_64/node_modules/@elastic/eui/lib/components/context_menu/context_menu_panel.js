'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiContextMenuPanel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tabbable = require('tabbable');

var _tabbable2 = _interopRequireDefault(_tabbable);

var _icon = require('../icon');

var _popover = require('../popover');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var transitionDirectionAndTypeToClassNameMap = {
  next: {
    in: 'euiContextMenuPanel-txInLeft',
    out: 'euiContextMenuPanel-txOutLeft'
  },
  previous: {
    in: 'euiContextMenuPanel-txInRight',
    out: 'euiContextMenuPanel-txOutRight'
  }
};

var EuiContextMenuPanel = exports.EuiContextMenuPanel = function (_Component) {
  _inherits(EuiContextMenuPanel, _Component);

  function EuiContextMenuPanel(props) {
    _classCallCheck(this, EuiContextMenuPanel);

    var _this = _possibleConstructorReturn(this, (EuiContextMenuPanel.__proto__ || Object.getPrototypeOf(EuiContextMenuPanel)).call(this, props));

    _this.incrementFocusedItemIndex = function (amount) {
      var nextFocusedItemIndex = void 0;

      if (_this.state.focusedItemIndex === undefined) {
        // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
        // either the first or last item.
        nextFocusedItemIndex = amount < 0 ? _this.menuItems.length - 1 : 0;
      } else {
        nextFocusedItemIndex = _this.state.focusedItemIndex + amount;

        if (nextFocusedItemIndex < 0) {
          nextFocusedItemIndex = _this.menuItems.length - 1;
        } else if (nextFocusedItemIndex === _this.menuItems.length) {
          nextFocusedItemIndex = 0;
        }
      }

      _this.setState({
        focusedItemIndex: nextFocusedItemIndex
      });
    };

    _this.onKeyDown = function (e) {
      // If this panel contains items you can use the left arrow key to go back at any time.
      // But if it doesn't contain items, then you have to focus on the back button specifically,
      // since there could be content inside the panel which requires use of the left arrow key,
      // e.g. text inputs.
      if (_this.props.items.length || document.activeElement === _this.backButton || document.activeElement === _this.panel) {
        if (e.keyCode === _services.cascadingMenuKeyCodes.LEFT) {
          if (_this.props.showPreviousPanel) {
            _this.props.showPreviousPanel();

            if (_this.props.onUseKeyboardToNavigate) {
              _this.props.onUseKeyboardToNavigate();
            }
          }
        }
      }

      if (_this.props.items.length) {
        switch (e.keyCode) {
          case _services.cascadingMenuKeyCodes.TAB:
            // We need to sync up with the user if s/he is tabbing through the items.
            var focusedItemIndex = _this.menuItems.indexOf(document.activeElement);

            _this.setState({
              focusedItemIndex: focusedItemIndex >= 0 && focusedItemIndex < _this.menuItems.length ? focusedItemIndex : undefined
            });
            break;

          case _services.cascadingMenuKeyCodes.UP:
            e.preventDefault();
            _this.incrementFocusedItemIndex(-1);

            if (_this.props.onUseKeyboardToNavigate) {
              _this.props.onUseKeyboardToNavigate();
            }
            break;

          case _services.cascadingMenuKeyCodes.DOWN:
            e.preventDefault();
            _this.incrementFocusedItemIndex(1);

            if (_this.props.onUseKeyboardToNavigate) {
              _this.props.onUseKeyboardToNavigate();
            }
            break;

          case _services.cascadingMenuKeyCodes.RIGHT:
            if (_this.props.showNextPanel) {
              e.preventDefault();
              _this.props.showNextPanel(_this.state.focusedItemIndex);

              if (_this.props.onUseKeyboardToNavigate) {
                _this.props.onUseKeyboardToNavigate();
              }
            }
            break;

          default:
            break;
        }
      }
    };

    _this.onTransitionComplete = function () {
      _this.setState({
        isTransitioning: false
      });

      if (_this.props.onTransitionComplete) {
        _this.props.onTransitionComplete();
      }
    };

    _this.menuItemRef = function (index, node) {
      // There's a weird bug where if you navigate to a panel without items, then this callback
      // is still invoked, so we have to do a truthiness check.
      if (node) {
        // Store all menu items.
        _this.menuItems[index] = node;
      }
    };

    _this.panelRef = function (node) {
      _this.panel = node;

      if (_this.panel) {
        if (_this.props.onHeightChange) {
          _this.props.onHeightChange(_this.panel.clientHeight);
        }
      }
    };

    _this.contentRef = function (node) {
      _this.content = node;
    };

    _this.menuItems = [];
    _this.state = {
      isTransitioning: Boolean(props.transitionType),
      focusedItemIndex: props.initialFocusedItemIndex
    };
    return _this;
  }

  _createClass(EuiContextMenuPanel, [{
    key: 'updateFocus',
    value: function updateFocus() {
      // If this panel has lost focus, then none of its content should be focused.
      if (!this.props.hasFocus) {
        if (this.panel.contains(document.activeElement)) {
          document.activeElement.blur();
        }
        return;
      }

      // Setting focus while transitioning causes the animation to glitch, so we have to wait
      // until it's finished before we focus anything.
      if (this.state.isTransitioning) {
        return;
      }

      // If there aren't any items then this is probably a form or something.
      if (!this.menuItems.length) {
        // If we've already focused on something inside the panel, everything's fine.
        if (this.panel.contains(document.activeElement)) {
          return;
        }

        // Otherwise let's focus the first tabbable item and expedite input from the user.
        if (this.content) {
          var tabbableItems = (0, _tabbable2.default)(this.content);
          if (tabbableItems.length) {
            tabbableItems[0].focus();
          }
        }
        return;
      }

      // If an item is focused, focus it.
      if (this.state.focusedItemIndex !== undefined) {
        this.menuItems[this.state.focusedItemIndex].focus();
        return;
      }

      // Focus on the panel as a last resort.
      if (!this.panel.contains(document.activeElement)) {
        this.panel.focus();
      }
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateFocus();
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      // Clear refs to menuItems if we're getting new ones.
      if (nextProps.items !== this.props.items) {
        this.menuItems = [];
      }

      if (nextProps.transitionType) {
        this.setState({
          isTransitioning: true
        });
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.updateFocus();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          children = _props.children,
          className = _props.className,
          onClose = _props.onClose,
          title = _props.title,
          onHeightChange = _props.onHeightChange,
          transitionType = _props.transitionType,
          transitionDirection = _props.transitionDirection,
          onTransitionComplete = _props.onTransitionComplete,
          onUseKeyboardToNavigate = _props.onUseKeyboardToNavigate,
          hasFocus = _props.hasFocus,
          items = _props.items,
          initialFocusedItemIndex = _props.initialFocusedItemIndex,
          showNextPanel = _props.showNextPanel,
          showPreviousPanel = _props.showPreviousPanel,
          rest = _objectWithoutProperties(_props, ['children', 'className', 'onClose', 'title', 'onHeightChange', 'transitionType', 'transitionDirection', 'onTransitionComplete', 'onUseKeyboardToNavigate', 'hasFocus', 'items', 'initialFocusedItemIndex', 'showNextPanel', 'showPreviousPanel']);

      var panelTitle = void 0;

      if (title) {
        if (Boolean(onClose)) {
          panelTitle = _react2.default.createElement(
            'button',
            {
              className: 'euiContextMenuPanelTitle',
              type: 'button',
              onClick: onClose,
              ref: function ref(node) {
                _this2.backButton = node;
              },
              'data-test-subj': 'contextMenuPanelTitleButton'
            },
            _react2.default.createElement(
              'span',
              { className: 'euiContextMenu__itemLayout' },
              _react2.default.createElement(_icon.EuiIcon, {
                type: 'arrowLeft',
                size: 'm',
                className: 'euiContextMenu__icon'
              }),
              _react2.default.createElement(
                'span',
                { className: 'euiContextMenu__text' },
                title
              )
            )
          );
        } else {
          panelTitle = _react2.default.createElement(
            _popover.EuiPopoverTitle,
            null,
            _react2.default.createElement(
              'span',
              { className: 'euiContextMenu__itemLayout' },
              title
            )
          );
        }
      }

      var classes = (0, _classnames2.default)('euiContextMenuPanel', className, this.state.isTransitioning && transitionDirectionAndTypeToClassNameMap[transitionDirection] ? transitionDirectionAndTypeToClassNameMap[transitionDirection][transitionType] : undefined);

      var content = items.length ? items.map(function (MenuItem, index) {
        return (0, _react.cloneElement)(MenuItem, {
          buttonRef: _this2.menuItemRef.bind(_this2, index)
        });
      }) : children;

      return _react2.default.createElement(
        'div',
        _extends({
          ref: this.panelRef,
          className: classes,
          onKeyDown: this.onKeyDown,
          tabIndex: '0',
          onAnimationEnd: this.onTransitionComplete
        }, rest),
        panelTitle,
        _react2.default.createElement(
          'div',
          { ref: this.contentRef },
          content
        )
      );
    }
  }]);

  return EuiContextMenuPanel;
}(_react.Component);

EuiContextMenuPanel.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  title: _propTypes2.default.node,
  onClose: _propTypes2.default.func,
  onHeightChange: _propTypes2.default.func,
  transitionType: _propTypes2.default.oneOf(['in', 'out']),
  transitionDirection: _propTypes2.default.oneOf(['next', 'previous']),
  onTransitionComplete: _propTypes2.default.func,
  onUseKeyboardToNavigate: _propTypes2.default.func,
  hasFocus: _propTypes2.default.bool,
  items: _propTypes2.default.array,
  showNextPanel: _propTypes2.default.func,
  showPreviousPanel: _propTypes2.default.func,
  initialFocusedItemIndex: _propTypes2.default.number
};
EuiContextMenuPanel.defaultProps = {
  hasFocus: true,
  items: []
};