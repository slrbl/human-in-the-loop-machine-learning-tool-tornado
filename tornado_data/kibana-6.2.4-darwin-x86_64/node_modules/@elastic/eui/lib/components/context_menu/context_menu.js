'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiContextMenu = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function mapIdsToPanels(panels) {
  var map = {};

  panels.forEach(function (panel) {
    map[panel.id] = panel;
  });

  return map;
}

function mapIdsToPreviousPanels(panels) {
  var idToPreviousPanelIdMap = {};

  panels.forEach(function (panel) {
    if (Array.isArray(panel.items)) {
      panel.items.forEach(function (item) {
        var isCloseable = item.panel !== undefined;
        if (isCloseable) {
          idToPreviousPanelIdMap[item.panel] = panel.id;
        }
      });
    }
  });

  return idToPreviousPanelIdMap;
}

function mapPanelItemsToPanels(panels) {
  var idAndItemIndexToPanelIdMap = {};

  panels.forEach(function (panel) {
    idAndItemIndexToPanelIdMap[panel.id] = {};

    if (panel.items) {
      panel.items.forEach(function (item, index) {
        if (item.panel) {
          idAndItemIndexToPanelIdMap[panel.id][index] = item.panel;
        }
      });
    }
  });

  return idAndItemIndexToPanelIdMap;
}

var EuiContextMenu = exports.EuiContextMenu = function (_Component) {
  _inherits(EuiContextMenu, _Component);

  function EuiContextMenu(props) {
    _classCallCheck(this, EuiContextMenu);

    var _this = _possibleConstructorReturn(this, (EuiContextMenu.__proto__ || Object.getPrototypeOf(EuiContextMenu)).call(this, props));

    _this.hasPreviousPanel = function (panelId) {
      var previousPanelId = _this.idToPreviousPanelIdMap[panelId];
      return typeof previousPanelId !== 'undefined';
    };

    _this.showNextPanel = function (itemIndex) {
      var nextPanelId = _this.idAndItemIndexToPanelIdMap[_this.state.incomingPanelId][itemIndex];
      if (nextPanelId) {
        if (_this.state.isUsingKeyboardToNavigate) {
          _this.setState({
            focusedItemIndex: 0
          });
        }

        _this.showPanel(nextPanelId, 'next');
      }
    };

    _this.showPreviousPanel = function () {
      // If there's a previous panel, then we can close the current panel to go back to it.
      if (_this.hasPreviousPanel(_this.state.incomingPanelId)) {
        var previousPanelId = _this.idToPreviousPanelIdMap[_this.state.incomingPanelId];

        // Set focus on the item which shows the panel we're leaving.
        var previousPanel = _this.idToPanelMap[previousPanelId];
        var focusedItemIndex = previousPanel.items.findIndex(function (item) {
          return item.panel === _this.state.incomingPanelId;
        });

        if (focusedItemIndex !== -1) {
          _this.setState({
            focusedItemIndex: focusedItemIndex
          });
        }

        _this.showPanel(previousPanelId, 'previous');
      }
    };

    _this.onIncomingPanelHeightChange = function (height) {
      _this.setState({
        height: height
      });
    };

    _this.onOutGoingPanelTransitionComplete = function () {
      _this.setState({
        isOutgoingPanelVisible: false
      });
    };

    _this.onUseKeyboardToNavigate = function () {
      if (!_this.state.isUsingKeyboardToNavigate) {
        _this.setState({
          isUsingKeyboardToNavigate: true
        });
      }
    };

    _this.idToPanelMap = {};
    _this.idToPreviousPanelIdMap = {};
    _this.idAndItemIndexToPanelIdMap = {};

    _this.state = {
      height: undefined,
      outgoingPanelId: undefined,
      incomingPanelId: props.initialPanelId,
      transitionDirection: undefined,
      isOutgoingPanelVisible: false,
      focusedItemIndex: undefined,
      isUsingKeyboardToNavigate: false
    };
    return _this;
  }

  _createClass(EuiContextMenu, [{
    key: 'showPanel',
    value: function showPanel(panelId, direction) {
      this.setState({
        outgoingPanelId: this.state.incomingPanelId,
        incomingPanelId: panelId,
        transitionDirection: direction,
        isOutgoingPanelVisible: true
      });
    }
  }, {
    key: 'updatePanelMaps',
    value: function updatePanelMaps(panels) {
      this.idToPanelMap = mapIdsToPanels(panels);
      this.idToPreviousPanelIdMap = mapIdsToPreviousPanels(panels);
      this.idAndItemIndexToPanelIdMap = mapPanelItemsToPanels(panels);
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.updatePanelMaps(this.props.panels);
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.panels !== this.props.panels) {
        this.updatePanelMaps(nextProps.panels);
      }
    }
  }, {
    key: 'renderItems',
    value: function renderItems() {
      var _this2 = this;

      var items = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      return items.map(function (item, index) {
        var panel = item.panel,
            name = item.name,
            icon = item.icon,
            onClick = item.onClick,
            rest = _objectWithoutProperties(item, ['panel', 'name', 'icon', 'onClick']);

        var onClickHandler = panel ? function (event) {
          if (onClick && event) {
            event.persist();
          }
          // This component is commonly wrapped in a EuiOutsideClickDetector, which means we'll
          // need to wait for that logic to complete before re-rendering the DOM via showPanel.
          window.requestAnimationFrame(function () {
            if (onClick) onClick(event);
            _this2.showNextPanel(index);
          });
        } : onClick;

        return _react2.default.createElement(
          _context_menu_item.EuiContextMenuItem,
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
  }, {
    key: 'renderPanel',
    value: function renderPanel(panelId, transitionType) {
      var _this3 = this;

      var panel = this.idToPanelMap[panelId];

      if (!panel) {
        return;
      }

      // As above, we need to wait for EuiOutsideClickDetector to complete its logic before
      // re-rendering via showPanel.
      var onClose = void 0;
      if (this.hasPreviousPanel(panelId)) {
        onClose = function onClose() {
          return window.requestAnimationFrame(_this3.showPreviousPanel);
        };
      }

      return _react2.default.createElement(
        _context_menu_panel.EuiContextMenuPanel,
        {
          key: panelId,
          className: 'euiContextMenu__panel',
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
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var _props = this.props,
          panels = _props.panels,
          className = _props.className,
          initialPanelId = _props.initialPanelId,
          rest = _objectWithoutProperties(_props, ['panels', 'className', 'initialPanelId']);

      var incomingPanel = this.renderPanel(this.state.incomingPanelId, 'in');
      var outgoingPanel = void 0;

      if (this.state.isOutgoingPanelVisible) {
        outgoingPanel = this.renderPanel(this.state.outgoingPanelId, 'out');
      }

      var classes = (0, _classnames2.default)('euiContextMenu', className);

      return _react2.default.createElement(
        'div',
        _extends({
          ref: function ref(node) {
            _this4.menu = node;
          },
          className: classes,
          style: { height: this.state.height }
        }, rest),
        outgoingPanel,
        incomingPanel
      );
    }
  }]);

  return EuiContextMenu;
}(_react.Component);

EuiContextMenu.propTypes = {
  className: _propTypes2.default.string,
  panels: _propTypes2.default.array,
  initialPanelId: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.number])
};
EuiContextMenu.defaultProps = {
  panels: []
};