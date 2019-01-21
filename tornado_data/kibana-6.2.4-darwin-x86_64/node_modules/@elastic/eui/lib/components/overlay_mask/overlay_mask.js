'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EuiOverlayMask = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactDom = require('react-dom');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * NOTE: We can't test this component because Enzyme doesn't support rendering
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * into portals.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var EuiOverlayMask = exports.EuiOverlayMask = function (_Component) {
  _inherits(EuiOverlayMask, _Component);

  function EuiOverlayMask(props) {
    _classCallCheck(this, EuiOverlayMask);

    var _this = _possibleConstructorReturn(this, (EuiOverlayMask.__proto__ || Object.getPrototypeOf(EuiOverlayMask)).call(this, props));

    var _this$props = _this.props,
        className = _this$props.className,
        children = _this$props.children,
        onClick = _this$props.onClick,
        rest = _objectWithoutProperties(_this$props, ['className', 'children', 'onClick']);

    _this.overlayMaskNode = document.createElement('div');
    _this.overlayMaskNode.className = (0, _classnames2.default)('euiOverlayMask', className);
    if (onClick) {
      _this.overlayMaskNode.addEventListener('click', onClick);
    }
    Object.keys(rest).forEach(function (key) {
      if (typeof rest[key] !== 'string') {
        throw new Error('Unhandled property type. EuiOverlayMask property ' + key + ' is not a string.');
      }
      _this.overlayMaskNode.setAttribute(key, rest[key]);
    });
    return _this;
  }

  _createClass(EuiOverlayMask, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      document.body.classList.add('euiBody-hasOverlayMask');
      document.body.appendChild(this.overlayMaskNode);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      document.body.classList.remove('euiBody-hasOverlayMask');

      if (this.props.onClick) {
        this.overlayMaskNode.removeEventListener('click', this.props.onClick);
      }
      document.body.removeChild(this.overlayMaskNode);
      this.overlayMaskNode = null;
    }
  }, {
    key: 'render',
    value: function render() {
      return (0, _reactDom.createPortal)(this.props.children, this.overlayMaskNode);
    }
  }]);

  return EuiOverlayMask;
}(_react.Component);

EuiOverlayMask.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onClick: _propTypes2.default.func
};