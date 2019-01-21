'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiContextMenuPanel = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _tabbable = require('tabbable');

var _tabbable2 = _interopRequireDefault(_tabbable);

var _components = require('../../components');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const transitionDirectionAndTypeToClassNameMap = {
  next: {
    in: 'kuiContextMenuPanel-txInLeft',
    out: 'kuiContextMenuPanel-txOutLeft'
  },
  previous: {
    in: 'kuiContextMenuPanel-txInRight',
    out: 'kuiContextMenuPanel-txOutRight'
  }
};

class KuiContextMenuPanel extends _react.Component {

  constructor(props) {
    super(props);

    this.incrementFocusedItemIndex = amount => {
      let nextFocusedItemIndex;

      if (this.state.focusedItemIndex === undefined) {
        // If this is the beginning of the user's keyboard navigation of the menu, then we'll focus
        // either the first or last item.
        nextFocusedItemIndex = amount < 0 ? this.menuItems.length - 1 : 0;
      } else {
        nextFocusedItemIndex = this.state.focusedItemIndex + amount;

        if (nextFocusedItemIndex < 0) {
          nextFocusedItemIndex = this.menuItems.length - 1;
        } else if (nextFocusedItemIndex === this.menuItems.length) {
          nextFocusedItemIndex = 0;
        }
      }

      this.setState({
        focusedItemIndex: nextFocusedItemIndex
      });
    };

    this.onKeyDown = e => {
      // If this panel contains items you can use the left arrow key to go back at any time.
      // But if it doesn't contain items, then you have to focus on the back button specifically,
      // since there could be content inside the panel which requires use of the left arrow key,
      // e.g. text inputs.
      if (this.props.items.length || document.activeElement === this.backButton || document.activeElement === this.panel) {
        if (e.keyCode === _services.cascadingMenuKeyCodes.LEFT) {
          if (this.props.showPreviousPanel) {
            this.props.showPreviousPanel();

            if (this.props.onUseKeyboardToNavigate) {
              this.props.onUseKeyboardToNavigate();
            }
          }
        }
      }

      if (this.props.items.length) {
        switch (e.keyCode) {
          case _services.cascadingMenuKeyCodes.TAB:
            // We need to sync up with the user if s/he is tabbing through the items.
            const focusedItemIndex = this.menuItems.indexOf(document.activeElement);

            this.setState({
              focusedItemIndex: focusedItemIndex >= 0 && focusedItemIndex < this.menuItems.length ? focusedItemIndex : undefined
            });
            break;

          case _services.cascadingMenuKeyCodes.UP:
            e.preventDefault();
            this.incrementFocusedItemIndex(-1);

            if (this.props.onUseKeyboardToNavigate) {
              this.props.onUseKeyboardToNavigate();
            }
            break;

          case _services.cascadingMenuKeyCodes.DOWN:
            e.preventDefault();
            this.incrementFocusedItemIndex(1);

            if (this.props.onUseKeyboardToNavigate) {
              this.props.onUseKeyboardToNavigate();
            }
            break;

          case _services.cascadingMenuKeyCodes.RIGHT:
            if (this.props.showNextPanel) {
              e.preventDefault();
              this.props.showNextPanel(this.state.focusedItemIndex);

              if (this.props.onUseKeyboardToNavigate) {
                this.props.onUseKeyboardToNavigate();
              }
            }
            break;

          default:
            break;
        }
      }
    };

    this.onTransitionComplete = () => {
      this.setState({
        isTransitioning: false
      });

      if (this.props.onTransitionComplete) {
        this.props.onTransitionComplete();
      }
    };

    this.menuItemRef = (index, node) => {
      // There's a weird bug where if you navigate to a panel without items, then this callback
      // is still invoked, so we have to do a truthiness check.
      if (node) {
        // Store all menu items.
        this.menuItems[index] = node;
      }
    };

    this.panelRef = node => {
      this.panel = node;

      if (this.panel) {
        if (this.props.onHeightChange) {
          this.props.onHeightChange(this.panel.clientHeight);
        }
      }
    };

    this.contentRef = node => {
      this.content = node;
    };

    this.menuItems = [];
    this.state = {
      isTransitioning: Boolean(props.transitionType),
      focusedItemIndex: props.initialFocusedItemIndex
    };
  }

  updateFocus() {
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
        const tabbableItems = (0, _tabbable2.default)(this.content);
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

  componentDidMount() {
    this.updateFocus();
  }

  componentWillReceiveProps(nextProps) {
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

  componentDidUpdate() {
    this.updateFocus();
  }

  render() {
    var _props = this.props;

    const children = _props.children,
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

    let panelTitle;

    if (title) {
      if (Boolean(onClose)) {
        panelTitle = _react2.default.createElement(
          'button',
          {
            className: 'kuiContextMenuPanelTitle',
            onClick: onClose,
            ref: node => {
              this.backButton = node;
            },
            'data-test-subj': 'contextMenuPanelTitleButton'
          },
          _react2.default.createElement(
            'span',
            { className: 'kuiContextMenu__itemLayout' },
            _react2.default.createElement('span', { className: 'kuiContextMenu__icon kuiIcon fa-angle-left' }),
            _react2.default.createElement(
              'span',
              { className: 'kuiContextMenu__text' },
              title
            )
          )
        );
      } else {
        panelTitle = _react2.default.createElement(
          _components.KuiPopoverTitle,
          null,
          _react2.default.createElement(
            'span',
            { className: 'kuiContextMenu__itemLayout' },
            title
          )
        );
      }
    }

    const classes = (0, _classnames2.default)('kuiContextMenuPanel', className, this.state.isTransitioning && transitionDirectionAndTypeToClassNameMap[transitionDirection] ? transitionDirectionAndTypeToClassNameMap[transitionDirection][transitionType] : undefined);

    const content = items.length ? items.map((MenuItem, index) => (0, _react.cloneElement)(MenuItem, {
      buttonRef: this.menuItemRef.bind(this, index)
    })) : children;

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
}
exports.KuiContextMenuPanel = KuiContextMenuPanel;
KuiContextMenuPanel.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  title: _propTypes2.default.string,
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
KuiContextMenuPanel.defaultProps = {
  hasFocus: true,
  items: []
};
