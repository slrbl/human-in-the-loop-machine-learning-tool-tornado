/*(c) Copyright 2015 Pivotal Software, Inc. All Rights Reserved.*/
'use strict';

exports.__esModule = true;
exports.HighlightPanel = exports.ClickableAltPanel = exports.ClickablePanel = exports.BasicPanelAlt = exports.BasicPanel = exports.SimplePanel = exports.ShadowPanel = exports.Panel = exports.PanelTitle = undefined;

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

var _helpers = require('../helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var paddingTypes = [];
['p', 'm'].forEach(function (type) {
  ['l', 'r', 't', 'b', 'h', 'v', 'a'].forEach(function (location) {
    ['n', 's', 'm', 'l', 'xl', 'xxl', 'xxxl', 'xxxxl'].forEach(function (size) {
      paddingTypes.push('' + type + location + size);
    });
  });
});

var PanelTitle = exports.PanelTitle = function (_React$PureComponent) {
  (0, _inherits3.default)(PanelTitle, _React$PureComponent);

  function PanelTitle() {
    (0, _classCallCheck3.default)(this, PanelTitle);
    return (0, _possibleConstructorReturn3.default)(this, _React$PureComponent.apply(this, arguments));
  }

  PanelTitle.prototype.componentDidMount = function componentDidMount() {
    require('../../css/panels');
  };

  PanelTitle.prototype.render = function render() {
    var _props = this.props,
        className = _props.className,
        other = (0, _objectWithoutProperties3.default)(_props, ['className']);

    className = (0, _classnames2.default)('panel-title-alt', className);
    return _react2.default.createElement('div', (0, _extends3.default)({ className: className }, other));
  };

  return PanelTitle;
}(_react2.default.PureComponent);

PanelTitle.propTypes = {
  className: _propTypes2.default.string
};

var PanelHeader = function (_React$Component) {
  (0, _inherits3.default)(PanelHeader, _React$Component);

  function PanelHeader() {
    (0, _classCallCheck3.default)(this, PanelHeader);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component.apply(this, arguments));
  }

  PanelHeader.prototype.componentDidMount = function componentDidMount() {
    require('../../css/panels');
  };

  PanelHeader.prototype.render = function render() {
    var _props2 = this.props,
        actions = _props2.actions,
        header = _props2.header,
        subtitle = _props2.subtitle;

    if (header) {
      var titleNode = header.constructor === String ? _react2.default.createElement(
        PanelTitle,
        null,
        header
      ) : header;

      var headerNode = subtitle ? _react2.default.createElement(
        'div',
        null,
        titleNode,
        _react2.default.createElement(
          'div',
          { className: 'panel-subtitle' },
          subtitle
        )
      ) : titleNode;

      var actionsNode = actions ? _react2.default.createElement(
        'div',
        { className: 'panel-actions' },
        actions
      ) : null;

      return _react2.default.createElement(
        'div',
        { className: 'panel-header' },
        headerNode,
        actionsNode
      );
    } else {
      return null;
    }
  };

  return PanelHeader;
}(_react2.default.Component);

PanelHeader.propTypes = {
  actions: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.object]),
  header: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.object]),
  subtitle: _propTypes2.default.node
};

var PanelFooter = function (_React$PureComponent2) {
  (0, _inherits3.default)(PanelFooter, _React$PureComponent2);

  function PanelFooter() {
    (0, _classCallCheck3.default)(this, PanelFooter);
    return (0, _possibleConstructorReturn3.default)(this, _React$PureComponent2.apply(this, arguments));
  }

  PanelFooter.prototype.componentDidMount = function componentDidMount() {
    require('../../css/panels');
  };

  PanelFooter.prototype.render = function render() {
    var footer = this.props.footer;


    if (footer) {
      return _react2.default.createElement(
        'div',
        { className: 'panel-footer' },
        footer
      );
    } else {
      return null;
    }
  };

  return PanelFooter;
}(_react2.default.PureComponent);

PanelFooter.propTypes = {
  footer: _propTypes2.default.node
};

var Panel = exports.Panel = function (_React$Component2) {
  (0, _inherits3.default)(Panel, _React$Component2);

  function Panel() {
    (0, _classCallCheck3.default)(this, Panel);
    return (0, _possibleConstructorReturn3.default)(this, _React$Component2.apply(this, arguments));
  }

  Panel.prototype.componentDidMount = function componentDidMount() {
    require('../../css/panels');
  };

  Panel.prototype.render = function render() {
    var _props3 = this.props,
        actions = _props3.actions,
        children = _props3.children,
        footer = _props3.footer,
        header = _props3.header,
        innerClassName = _props3.innerClassName,
        padding = _props3.padding,
        scrollable = _props3.scrollable,
        shadowLevel = _props3.shadowLevel,
        subtitle = _props3.subtitle,
        other = (0, _objectWithoutProperties3.default)(_props3, ['actions', 'children', 'footer', 'header', 'innerClassName', 'padding', 'scrollable', 'shadowLevel', 'subtitle']);

    var scrollableStyle = typeof scrollable === 'number' ? { maxHeight: scrollable + 'px' } : null;
    var props = (0, _helpers.mergeProps)(other, {
      className: ['panel', this.kind]
    });

    var bodyProps = {
      className: (0, _classnames2.default)('panel-body', padding, innerClassName, { 'panel-scrollable': scrollable }),
      style: scrollableStyle
    };

    return _react2.default.createElement(
      'div',
      props,
      _react2.default.createElement(PanelHeader, { actions: actions, header: header, subtitle: subtitle }),
      _react2.default.createElement(
        'div',
        bodyProps,
        children
      ),
      _react2.default.createElement(PanelFooter, { footer: footer })
    );
  };

  return Panel;
}(_react2.default.Component);

Panel.propTypes = {
  header: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.object]),
  footer: _propTypes2.default.node,
  actions: _propTypes2.default.oneOfType([_propTypes2.default.node, _propTypes2.default.object]),
  subtitle: _propTypes2.default.node,
  innerClassName: _propTypes2.default.string,
  padding: function padding(props, propName, componentName) {
    if (props.padding && !props.padding.split(' ').every(function (pad) {
      return paddingTypes.indexOf(pad) >= 0;
    })) {
      return new Error('Invalid padding type used in ' + componentName);
    }
  },
  scrollable: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.number])
};

var ShadowPanel = exports.ShadowPanel = function (_Panel) {
  (0, _inherits3.default)(ShadowPanel, _Panel);

  function ShadowPanel(props) {
    (0, _classCallCheck3.default)(this, ShadowPanel);

    var _this5 = (0, _possibleConstructorReturn3.default)(this, _Panel.call(this, props));

    _this5.kind = 'panel-shadow-' + props.shadowLevel;
    return _this5;
  }

  return ShadowPanel;
}(Panel);

ShadowPanel.propTypes = (0, _extends3.default)({}, Panel.propTypes, {
  shadowLevel: _propTypes2.default.oneOf([1, 2, 3, 4])
});
ShadowPanel.defaultProps = {
  shadowLevel: 3
};

var SimplePanel = exports.SimplePanel = function (_Panel2) {
  (0, _inherits3.default)(SimplePanel, _Panel2);

  function SimplePanel() {
    var _temp, _this6, _ret;

    (0, _classCallCheck3.default)(this, SimplePanel);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this6 = (0, _possibleConstructorReturn3.default)(this, _Panel2.call.apply(_Panel2, [this].concat(args))), _this6), _this6.kind = 'panel-simple', _temp), (0, _possibleConstructorReturn3.default)(_this6, _ret);
  }

  return SimplePanel;
}(Panel);

var BasicPanel = exports.BasicPanel = function (_Panel3) {
  (0, _inherits3.default)(BasicPanel, _Panel3);

  function BasicPanel() {
    var _temp2, _this7, _ret2;

    (0, _classCallCheck3.default)(this, BasicPanel);

    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return _ret2 = (_temp2 = (_this7 = (0, _possibleConstructorReturn3.default)(this, _Panel3.call.apply(_Panel3, [this].concat(args))), _this7), _this7.kind = 'panel-basic', _temp2), (0, _possibleConstructorReturn3.default)(_this7, _ret2);
  }

  return BasicPanel;
}(Panel);

var BasicPanelAlt = exports.BasicPanelAlt = function (_Panel4) {
  (0, _inherits3.default)(BasicPanelAlt, _Panel4);

  function BasicPanelAlt() {
    var _temp3, _this8, _ret3;

    (0, _classCallCheck3.default)(this, BasicPanelAlt);

    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return _ret3 = (_temp3 = (_this8 = (0, _possibleConstructorReturn3.default)(this, _Panel4.call.apply(_Panel4, [this].concat(args))), _this8), _this8.kind = 'panel-basic-alt', _temp3), (0, _possibleConstructorReturn3.default)(_this8, _ret3);
  }

  return BasicPanelAlt;
}(Panel);

var ClickablePanel = exports.ClickablePanel = function (_Panel5) {
  (0, _inherits3.default)(ClickablePanel, _Panel5);

  function ClickablePanel() {
    var _temp4, _this9, _ret4;

    (0, _classCallCheck3.default)(this, ClickablePanel);

    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return _ret4 = (_temp4 = (_this9 = (0, _possibleConstructorReturn3.default)(this, _Panel5.call.apply(_Panel5, [this].concat(args))), _this9), _this9.kind = 'panel-clickable', _temp4), (0, _possibleConstructorReturn3.default)(_this9, _ret4);
  }

  return ClickablePanel;
}(Panel);

var ClickableAltPanel = exports.ClickableAltPanel = function (_Panel6) {
  (0, _inherits3.default)(ClickableAltPanel, _Panel6);

  function ClickableAltPanel() {
    var _temp5, _this10, _ret5;

    (0, _classCallCheck3.default)(this, ClickableAltPanel);

    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return _ret5 = (_temp5 = (_this10 = (0, _possibleConstructorReturn3.default)(this, _Panel6.call.apply(_Panel6, [this].concat(args))), _this10), _this10.kind = 'panel-clickable-alt', _temp5), (0, _possibleConstructorReturn3.default)(_this10, _ret5);
  }

  return ClickableAltPanel;
}(Panel);

var HighlightPanel = exports.HighlightPanel = function (_Panel7) {
  (0, _inherits3.default)(HighlightPanel, _Panel7);

  function HighlightPanel() {
    var _temp6, _this11, _ret6;

    (0, _classCallCheck3.default)(this, HighlightPanel);

    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return _ret6 = (_temp6 = (_this11 = (0, _possibleConstructorReturn3.default)(this, _Panel7.call.apply(_Panel7, [this].concat(args))), _this11), _this11.kind = 'panel-highlight', _temp6), (0, _possibleConstructorReturn3.default)(_this11, _ret6);
  }

  return HighlightPanel;
}(Panel);