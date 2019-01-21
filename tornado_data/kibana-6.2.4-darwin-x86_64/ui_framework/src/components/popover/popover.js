'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiPopover = exports.ANCHOR_POSITIONS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

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

var _panel_simple = require('../../components/panel_simple');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const anchorPositionToClassNameMap = {
  'center': '',
  'left': 'kuiPopover--anchorLeft',
  'right': 'kuiPopover--anchorRight'
};

const ANCHOR_POSITIONS = exports.ANCHOR_POSITIONS = Object.keys(anchorPositionToClassNameMap);

class KuiPopover extends _react.Component {
  constructor(props) {
    super(props);

    this.onKeyDown = e => {
      if (e.keyCode === _services.cascadingMenuKeyCodes.ESCAPE) {
        this.props.closePopover();
      }
    };

    this.panelRef = node => {
      if (this.props.ownFocus) {
        this.panel = node;
      }
    };

    this.closingTransitionTimeout = undefined;

    this.state = {
      isClosing: false,
      isOpening: false
    };
  }

  updateFocus() {
    // Wait for the DOM to update.
    window.requestAnimationFrame(() => {
      if (!this.panel) {
        return;
      }

      // If we've already focused on something inside the panel, everything's fine.
      if (this.panel.contains(document.activeElement)) {
        return;
      }

      // Otherwise let's focus the first tabbable item and expedite input from the user.
      const tabbableItems = (0, _tabbable2.default)(this.panel);
      if (tabbableItems.length) {
        tabbableItems[0].focus();
      }
    });
  }

  componentDidMount() {
    this.updateFocus();
  }

  componentWillReceiveProps(nextProps) {
    // The popover is being opened.
    if (!this.props.isOpen && nextProps.isOpen) {
      clearTimeout(this.closingTransitionTimeout);
      // We need to set this state a beat after the render takes place, so that the CSS
      // transition can take effect.
      window.requestAnimationFrame(() => {
        this.setState({
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

      this.closingTransitionTimeout = setTimeout(() => {
        this.setState({
          isClosing: false
        });
      }, 250);
    }
  }

  componentDidUpdate() {
    this.updateFocus();
  }

  componentWillUnmount() {
    clearTimeout(this.closingTransitionTimeout);
  }

  render() {
    var _props = this.props;

    const anchorPosition = _props.anchorPosition,
          button = _props.button,
          isOpen = _props.isOpen,
          ownFocus = _props.ownFocus,
          withTitle = _props.withTitle,
          children = _props.children,
          className = _props.className,
          closePopover = _props.closePopover,
          panelClassName = _props.panelClassName,
          panelPaddingSize = _props.panelPaddingSize,
          rest = _objectWithoutProperties(_props, ['anchorPosition', 'button', 'isOpen', 'ownFocus', 'withTitle', 'children', 'className', 'closePopover', 'panelClassName', 'panelPaddingSize']);

    const classes = (0, _classnames2.default)('kuiPopover', anchorPositionToClassNameMap[anchorPosition], className, {
      'kuiPopover-isOpen': this.state.isOpening,
      'kuiPopover--withTitle': withTitle
    });

    const panelClasses = (0, _classnames2.default)('kuiPopover__panel', panelClassName);

    let panel;

    if (isOpen || this.state.isClosing) {
      let tabIndex;
      let initialFocus;

      if (ownFocus) {
        tabIndex = '0';
        initialFocus = () => this.panel;
      }

      panel = _react2.default.createElement(
        _focusTrapReact2.default,
        {
          focusTrapOptions: {
            clickOutsideDeactivates: true,
            initialFocus
          }
        },
        _react2.default.createElement(
          _panel_simple.KuiPanelSimple,
          {
            panelRef: this.panelRef,
            className: panelClasses,
            paddingSize: panelPaddingSize,
            tabIndex: tabIndex,
            hasShadow: true
          },
          children
        )
      );
    }

    return _react2.default.createElement(
      _outside_click_detector.KuiOutsideClickDetector,
      { onOutsideClick: closePopover },
      _react2.default.createElement(
        'div',
        _extends({
          className: classes,
          onKeyDown: this.onKeyDown
        }, rest),
        button,
        panel
      )
    );
  }
}

exports.KuiPopover = KuiPopover;
KuiPopover.propTypes = {
  isOpen: _propTypes2.default.bool,
  ownFocus: _propTypes2.default.bool,
  withTitle: _propTypes2.default.bool,
  closePopover: _propTypes2.default.func.isRequired,
  button: _propTypes2.default.node.isRequired,
  children: _propTypes2.default.node,
  anchorPosition: _propTypes2.default.oneOf(ANCHOR_POSITIONS),
  panelClassName: _propTypes2.default.string,
  panelPaddingSize: _propTypes2.default.oneOf(_panel_simple.SIZES)
};

KuiPopover.defaultProps = {
  isOpen: false,
  ownFocus: false,
  anchorPosition: 'center',
  panelPaddingSize: 'm'
};
