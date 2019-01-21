'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.KuiModal = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _focusTrapReact = require('focus-trap-react');

var _focusTrapReact2 = _interopRequireDefault(_focusTrapReact);

var _services = require('../../services');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

class KuiModal extends _react.Component {
  constructor(...args) {
    var _temp;

    return _temp = super(...args), this.onKeyDown = event => {
      if (event.keyCode === _services.keyCodes.ESCAPE) {
        this.props.onClose();
      }
    }, _temp;
  }

  render() {
    var _props = this.props;

    const className = _props.className,
          children = _props.children,
          onClose = _props.onClose,
          rest = _objectWithoutProperties(_props, ['className', 'children', 'onClose']);

    const classes = (0, _classnames2.default)('kuiModal', className);

    return _react2.default.createElement(
      _focusTrapReact2.default,
      {
        focusTrapOptions: {
          fallbackFocus: () => this.modal
        }
      },
      _react2.default.createElement(
        'div',
        _extends({
          ref: node => {
            this.modal = node;
          },
          className: classes,
          onKeyDown: this.onKeyDown,
          tabIndex: 0
        }, rest),
        children
      )
    );
  }
}

exports.KuiModal = KuiModal;
KuiModal.propTypes = {
  className: _propTypes2.default.string,
  children: _propTypes2.default.node,
  onClose: _propTypes2.default.func.isRequired
};
