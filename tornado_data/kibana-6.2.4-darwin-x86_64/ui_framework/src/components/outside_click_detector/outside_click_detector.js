'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiOutsideClickDetector = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class KuiOutsideClickDetector extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.onClickOutside = event => {
      if (!this.wrapperRef) {
        return;
      }

      if (this.wrapperRef === event.target) {
        return;
      }

      if (this.wrapperRef.contains(event.target)) {
        return;
      }

      this.props.onOutsideClick();
    }, _temp;
  }

  componentDidMount() {
    document.addEventListener('mousedown', this.onClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onClickOutside);
  }

  render() {
    const props = _extends({}, this.props.children.props, {
      ref: node => {
        this.wrapperRef = node;
      }
    });

    const child = _react.Children.only(this.props.children);
    return (0, _react.cloneElement)(child, props);
  }
}
exports.KuiOutsideClickDetector = KuiOutsideClickDetector;
KuiOutsideClickDetector.propTypes = {
  children: _propTypes2.default.node.isRequired,
  onOutsideClick: _propTypes2.default.func.isRequired
};
