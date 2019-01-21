'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiImage = exports.SIZES = undefined;

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

var _overlay_mask = require('../overlay_mask');

var _icon = require('../icon');

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sizeToClassNameMap = {
  s: 'euiImage--small',
  m: 'euiImage--medium',
  l: 'euiImage--large',
  xl: 'euiImage--xlarge',
  fullWidth: 'euiImage--fullWidth',
  original: ''
};

var SIZES = exports.SIZES = Object.keys(sizeToClassNameMap);

var fullScreenIconColorMap = {
  light: 'ghost',
  dark: 'default'
};

var EuiImage = exports.EuiImage = function (_Component) {
  _inherits(EuiImage, _Component);

  function EuiImage(props) {
    _classCallCheck(this, EuiImage);

    var _this = _possibleConstructorReturn(this, (EuiImage.__proto__ || Object.getPrototypeOf(EuiImage)).call(this, props));

    _this.onKeyDown = function (event) {
      if (event.keyCode === _services.keyCodes.ESCAPE) {
        _this.closeFullScreen();
      }
    };

    _this.closeFullScreen = function () {
      _this.setState({
        isFullScreen: false
      });
    };

    _this.openFullScreen = function () {
      _this.setState({
        isFullScreen: true
      });
    };

    _this.state = {
      isFullScreen: false
    };
    return _this;
  }

  _createClass(EuiImage, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          className = _props.className,
          url = _props.url,
          size = _props.size,
          caption = _props.caption,
          hasShadow = _props.hasShadow,
          allowFullScreen = _props.allowFullScreen,
          fullScreenIconColor = _props.fullScreenIconColor,
          alt = _props.alt,
          rest = _objectWithoutProperties(_props, ['className', 'url', 'size', 'caption', 'hasShadow', 'allowFullScreen', 'fullScreenIconColor', 'alt']);

      var classes = (0, _classnames2.default)('euiImage', sizeToClassNameMap[size], {
        'euiImage--hasShadow': hasShadow,
        'euiImage--allowFullScreen': allowFullScreen
      }, className);

      var optionalCaption = void 0;
      if (caption) {
        optionalCaption = _react2.default.createElement(
          'figcaption',
          { className: 'euiImage__caption' },
          caption
        );
      }

      var optionalIcon = void 0;

      if (allowFullScreen) {
        optionalIcon = _react2.default.createElement(_icon.EuiIcon, { type: 'fullScreen', color: fullScreenIconColorMap[fullScreenIconColor], className: 'euiImage__icon' });
      }

      var fullScreenDisplay = void 0;

      if (this.state.isFullScreen) {
        fullScreenDisplay = _react2.default.createElement(
          _focusTrapReact2.default,
          {
            focusTrapOptions: {
              clickOutsideDeactivates: true,
              initialFocus: function initialFocus() {
                return _this2.figure;
              }
            }
          },
          _react2.default.createElement(
            _overlay_mask.EuiOverlayMask,
            { onClick: this.closeFullScreen },
            _react2.default.createElement(
              'figure',
              {
                ref: function ref(node) {
                  _this2.figure = node;
                },
                className: 'euiImageFullScreen',
                onClick: this.closeFullScreen,
                tabIndex: 0,
                onKeyDown: this.onKeyDown
              },
              _react2.default.createElement('img', { src: url, className: 'euiImageFullScreen__img', alt: alt }),
              optionalCaption
            )
          )
        );
      }

      return _react2.default.createElement(
        'figure',
        _extends({
          className: classes,
          onClick: allowFullScreen ? this.openFullScreen : undefined
        }, rest),
        _react2.default.createElement('img', { src: url, className: 'euiImage__img', alt: alt }),
        optionalCaption,
        optionalIcon,
        fullScreenDisplay
      );
    }
  }]);

  return EuiImage;
}(_react.Component);

EuiImage.propTypes = {
  children: _propTypes2.default.node,
  className: _propTypes2.default.string
};


EuiImage.propTypes = {
  alt: _propTypes2.default.string.isRequired,
  size: _propTypes2.default.string.isRequired,
  fullScreenIconColor: _propTypes2.default.string
};

EuiImage.defaultProps = {
  size: 'original',
  fullScreenIconColor: 'light'
};