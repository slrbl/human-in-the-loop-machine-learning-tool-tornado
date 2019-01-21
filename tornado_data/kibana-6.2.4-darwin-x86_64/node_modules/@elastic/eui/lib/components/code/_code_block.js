'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiCodeBlockImpl = exports.PADDING_SIZES = exports.FONT_SIZES = undefined;

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

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

var _button = require('../button');

var _overlay_mask = require('../overlay_mask');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var fontSizeToClassNameMap = {
  s: 'euiCodeBlock--fontSmall',
  m: 'euiCodeBlock--fontMedium',
  l: 'euiCodeBlock--fontLarge'
};

var FONT_SIZES = exports.FONT_SIZES = Object.keys(fontSizeToClassNameMap);

var paddingSizeToClassNameMap = {
  s: 'euiCodeBlock--paddingSmall',
  m: 'euiCodeBlock--paddingMedium',
  l: 'euiCodeBlock--paddingLarge'
};

var PADDING_SIZES = exports.PADDING_SIZES = Object.keys(paddingSizeToClassNameMap);

var EuiCodeBlockImpl = exports.EuiCodeBlockImpl = function (_Component) {
  _inherits(EuiCodeBlockImpl, _Component);

  function EuiCodeBlockImpl(props) {
    _classCallCheck(this, EuiCodeBlockImpl);

    var _this = _possibleConstructorReturn(this, (EuiCodeBlockImpl.__proto__ || Object.getPrototypeOf(EuiCodeBlockImpl)).call(this, props));

    _this.highlight = function () {
      if (_this.props.language) {
        _highlight2.default.highlightBlock(_this.code);

        if (_this.codeFullScreen) {
          _highlight2.default.highlightBlock(_this.codeFullScreen);
        }
      }
    };

    _this.onKeyDown = function (event) {
      if (event.keyCode === _services.keyCodes.ESCAPE) {
        _this.closeFullScreen();
      }
    };

    _this.toggleFullScreen = function () {
      _this.setState(function (prevState) {
        return {
          isFullScreen: !prevState.isFullScreen
        };
      });
    };

    _this.closeFullScreen = function () {
      _this.setState({
        isFullScreen: false
      });
    };

    _this.state = {
      isFullScreen: false
    };
    return _this;
  }

  _createClass(EuiCodeBlockImpl, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.highlight();
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.highlight();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          inline = _props.inline,
          children = _props.children,
          className = _props.className,
          fontSize = _props.fontSize,
          language = _props.language,
          overflowHeight = _props.overflowHeight,
          paddingSize = _props.paddingSize,
          transparentBackground = _props.transparentBackground,
          otherProps = _objectWithoutProperties(_props, ['inline', 'children', 'className', 'fontSize', 'language', 'overflowHeight', 'paddingSize', 'transparentBackground']);

      var classes = (0, _classnames2.default)('euiCodeBlock', fontSizeToClassNameMap[fontSize], paddingSizeToClassNameMap[paddingSize], {
        'euiCodeBlock--transparentBackground': transparentBackground,
        'euiCodeBlock--inline': inline
      }, className);

      var codeClasses = (0, _classnames2.default)('euiCodeBlock__code', language);

      var optionalStyles = {};

      if (overflowHeight) {
        optionalStyles.height = overflowHeight;
      }

      var codeSnippet = _react2.default.createElement(
        'code',
        _extends({
          ref: function ref(_ref) {
            _this2.code = _ref;
          },
          className: codeClasses
        }, otherProps),
        children
      );

      var wrapperProps = {
        className: classes,
        style: optionalStyles
      };

      if (inline) {
        return _react2.default.createElement(
          'span',
          wrapperProps,
          codeSnippet
        );
      }

      var fullScreenButton = void 0;

      if (!inline) {
        fullScreenButton = _react2.default.createElement(_button.EuiButtonIcon, {
          className: 'euiCodeBlock__fullScreenButton',
          size: 's',
          onClick: this.toggleFullScreen,
          iconType: this.state.isFullScreen ? 'cross' : 'expand',
          'aria-label': this.state.isFullScreen ? 'Collapse' : 'Expand'
        });
      }

      var fullScreenDisplay = void 0;

      if (this.state.isFullScreen) {
        var fullScreenClasses = (0, _classnames2.default)(classes, 'euiCodeBlock-isFullScreen');

        fullScreenDisplay = _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              clickOutsideDeactivates: true,
              initialFocus: function initialFocus() {
                return _this2.codeFullScreen;
              }
            }
          },
          _react2.default.createElement(
            _overlay_mask.EuiOverlayMask,
            null,
            _react2.default.createElement(
              'div',
              { className: fullScreenClasses },
              _react2.default.createElement(
                'pre',
                { className: 'euiCodeBlock__pre' },
                _react2.default.createElement(
                  'code',
                  {
                    ref: function ref(_ref2) {
                      _this2.codeFullScreen = _ref2;
                    },
                    className: codeClasses,
                    tabIndex: 0,
                    onKeyDown: this.onKeyDown
                  },
                  children
                )
              ),
              fullScreenButton
            )
          )
        );
      }

      return _react2.default.createElement(
        'div',
        wrapperProps,
        _react2.default.createElement(
          'pre',
          { className: 'euiCodeBlock__pre' },
          codeSnippet
        ),
        fullScreenButton,
        fullScreenDisplay
      );
    }
  }]);

  return EuiCodeBlockImpl;
}(_react.Component);

EuiCodeBlockImpl.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};


EuiCodeBlockImpl.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string,
  paddingSize: _propTypes2.default.oneOf(PADDING_SIZES),
  fontSize: _propTypes2.default.oneOf(FONT_SIZES),
  transparentBackground: _propTypes2.default.bool,
  inline: _propTypes2.default.bool
};

EuiCodeBlockImpl.defaultProps = {
  transparentBackground: false,
  paddingSize: 'l',
  fontSize: 's'
};