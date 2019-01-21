'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiContextMenu = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _context_menu_panel = require('./context_menu_panel');

var _context_menu_item = require('./context_menu_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function mapIdsToPanels(panels) {
  const map = {};

  panels.forEach(panel => {
    map[panel.id] = panel;
  });

  return map;
}

function mapIdsToPreviousPanels(panels) {
  const idToPreviousPanelIdMap = {};

  panels.forEach(panel => {
    if (Array.isArray(panel.items)) {
      panel.items.forEach(item => {
        const isCloseable = item.panel !== undefined;
        if (isCloseable) {
          idToPreviousPanelIdMap[item.panel] = panel.id;
        }
      });
    }
  });

  return idToPreviousPanelIdMap;
}

function mapPanelItemsToPanels(panels) {
  const idAndItemIndexToPanelIdMap = {};

  panels.forEach(panel => {
    idAndItemIndexToPanelIdMap[panel.id] = {};

    if (panel.items) {
      panel.items.forEach((item, index) => {
        if (item.panel) {
          idAndItemIndexToPanelIdMap[panel.id][index] = item.panel;
        }
      });
    }
  });

  return idAndItemIndexToPanelIdMap;
}

class KuiContextMenu extends _react.Component {

  constructor(props) {
    super(props);

    this.hasPreviousPanel = panelId => {
      const previousPanelId = this.idToPreviousPanelIdMap[panelId];
      return typeof previousPanelId !== 'undefined';
    };

    this.showNextPanel = itemIndex => {
      const nextPanelId = this.idAndItemIndexToPanelIdMap[this.state.incomingPanelId][itemIndex];
      if (nextPanelId) {
        if (this.state.isUsingKeyboardToNavigate) {
          this.setState({
            focusedItemIndex: 0
          });
        }

        this.showPanel(nextPanelId, 'next');
      }
    };

    this.showPreviousPanel = () => {
      // If there's a previous panel, then we can close the current panel to go back to it.
      if (this.hasPreviousPanel(this.state.incomingPanelId)) {
        const previousPanelId = this.idToPreviousPanelIdMap[this.state.incomingPanelId];

        // Set focus on the item which shows the panel we're leaving.
        const previousPanel = this.idToPanelMap[previousPanelId];
        const focusedItemIndex = previousPanel.items.findIndex(item => item.panel === this.state.incomingPanelId);

        if (focusedItemIndex !== -1) {
          this.setState({
            focusedItemIndex
          });
        }

        this.showPanel(previousPanelId, 'previous');
      }
    };

    this.onIncomingPanelHeightChange = height => {
      this.setState({
        height
      });
    };

    this.onOutGoingPanelTransitionComplete = () => {
      this.setState({
        isOutgoingPanelVisible: false
      });
    };

    this.onUseKeyboardToNavigate = () => {
      if (!this.state.isUsingKeyboardToNavigate) {
        this.setState({
          isUsingKeyboardToNavigate: true
        });
      }
    };

    this.idToPanelMap = {};
    this.idToPreviousPanelIdMap = {};
    this.idAndItemIndexToPanelIdMap = {};

    this.state = {
      height: undefined,
      outgoingPanelId: undefined,
      incomingPanelId: props.initialPanelId,
      transitionDirection: undefined,
      isOutgoingPanelVisible: false,
      focusedItemIndex: undefined,
      isUsingKeyboardToNavigate: false
    };
  }

  showPanel(panelId, direction) {
    this.setState({
      outgoingPanelId: this.state.incomingPanelId,
      incomingPanelId: panelId,
      transitionDirection: direction,
      isOutgoingPanelVisible: true
    });
  }

  updatePanelMaps(panels) {
    this.idToPanelMap = mapIdsToPanels(panels);
    this.idToPreviousPanelIdMap = mapIdsToPreviousPanels(panels);
    this.idAndItemIndexToPanelIdMap = mapPanelItemsToPanels(panels);
  }

  componentWillMount() {
    this.updatePanelMaps(this.props.panels);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.panels !== this.props.panels) {
      this.updatePanelMaps(nextProps.panels);
    }
  }

  renderItems(items = []) {
    return items.map((item, index) => {
      const panel = item.panel,
            name = item.name,
            icon = item.icon,
            onClick = item.onClick,
            rest = _objectWithoutProperties(item, ['panel', 'name', 'icon', 'onClick']);

      const onClickHandler = panel ? () => {
        // This component is commonly wrapped in a KuiOutsideClickDetector, which means we'll
        // need to wait for that logic to complete before re-rendering the DOM via showPanel.
        window.requestAnimationFrame(() => {
          if (onClick) onClick();
          this.showNextPanel(index);
        });
      } : onClick;

      return _react2.default.createElement(
        _context_menu_item.KuiContextMenuItem,
        _extends({
          key: name,
          icon: icon,
          onClick: onClickHandler,
          hasPanel: Boolean(panel)
        }, rest),
        name
      );
    });
  }

  renderPanel(panelId, transitionType) {
    const panel = this.idToPanelMap[panelId];

    if (!panel) {
      return;
    }

    // As above, we need to wait for KuiOutsideClickDetector to complete its logic before
    // re-rendering via showPanel.
    let onClose;
    if (this.hasPreviousPanel(panelId)) {
      onClose = () => window.requestAnimationFrame(this.showPreviousPanel);
    }

    return _react2.default.createElement(
      _context_menu_panel.KuiContextMenuPanel,
      {
        key: panelId,
        className: 'kuiContextMenu__panel',
        onHeightChange: transitionType === 'in' ? this.onIncomingPanelHeightChange : undefined,
        onTransitionComplete: transitionType === 'out' ? this.onOutGoingPanelTransitionComplete : undefined,
        title: panel.title,
        onClose: onClose,
        transitionType: this.state.isOutgoingPanelVisible ? transitionType : undefined,
        transitionDirection: this.state.isOutgoingPanelVisible ? this.state.transitionDirection : undefined,
        hasFocus: transitionType === 'in',
        items: this.renderItems(panel.items),
        initialFocusedItemIndex: this.state.isUsingKeyboardToNavigate ? this.state.focusedItemIndex : undefined,
        onUseKeyboardToNavigate: this.onUseKeyboardToNavigate,
        showNextPanel: this.showNextPanel,
        showPreviousPanel: this.showPreviousPanel
      },
      panel.content
    );
  }

  render() {
    var _props = this.props;

    const panels = _props.panels,
          className = _props.className,
          initialPanelId = _props.initialPanelId,
          rest = _objectWithoutProperties(_props, ['panels', 'className', 'initialPanelId']);

    const incomingPanel = this.renderPanel(this.state.incomingPanelId, 'in');
    let outgoingPanel;

    if (this.state.isOutgoingPanelVisible) {
      outgoingPanel = this.renderPanel(this.state.outgoingPanelId, 'out');
    }

    const classes = (0, _classnames2.default)('kuiContextMenu', className);

    return _react2.default.createElement(
      'div',
      _extends({
        ref: node => {
          this.menu = node;
        },
        className: classes,
        style: { height: this.state.height }
      }, rest),
      outgoingPanel,
      incomingPanel
    );
  }
}
exports.KuiContextMenu = KuiContextMenu;
KuiContextMenu.propTypes = {
  className: _propTypes2.default.string,
  panels: _propTypes2.default.array,
  initialPanelId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
KuiContextMenu.defaultProps = {
  panels: []
};
