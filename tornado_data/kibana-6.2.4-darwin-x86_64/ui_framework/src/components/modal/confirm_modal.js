'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CANCEL_BUTTON = exports.CONFIRM_BUTTON = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.KuiConfirmModal = KuiConfirmModal;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _modal = require('./modal');

var _modal_footer = require('./modal_footer');

var _modal_header = require('./modal_header');

var _modal_header_title = require('./modal_header_title');

var _modal_body = require('./modal_body');

var _components = require('../../components/');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

const CONFIRM_BUTTON = exports.CONFIRM_BUTTON = 'confirm';
const CANCEL_BUTTON = exports.CANCEL_BUTTON = 'cancel';

const CONFIRM_MODAL_BUTTONS = [CONFIRM_BUTTON, CANCEL_BUTTON];

function KuiConfirmModal(_ref) {
  let children = _ref.children,
      title = _ref.title,
      onCancel = _ref.onCancel,
      onConfirm = _ref.onConfirm,
      cancelButtonText = _ref.cancelButtonText,
      confirmButtonText = _ref.confirmButtonText,
      className = _ref.className,
      defaultFocusedButton = _ref.defaultFocusedButton,
      rest = _objectWithoutProperties(_ref, ['children', 'title', 'onCancel', 'onConfirm', 'cancelButtonText', 'confirmButtonText', 'className', 'defaultFocusedButton']);

  const classes = (0, _classnames2.default)('kuiModal--confirmation', className);

  let modalTitle;

  if (title) {
    modalTitle = _react2.default.createElement(
      _modal_header.KuiModalHeader,
      null,
      _react2.default.createElement(
        _modal_header_title.KuiModalHeaderTitle,
        { 'data-test-subj': 'confirmModalTitleText' },
        title
      )
    );
  }

  let message;

  if (typeof children === 'string') {
    message = _react2.default.createElement(
      'p',
      { className: 'kuiText' },
      children
    );
  } else {
    message = children;
  }

  return _react2.default.createElement(
    _modal.KuiModal,
    _extends({
      className: classes,
      onClose: onCancel
    }, rest),
    modalTitle,
    _react2.default.createElement(
      _modal_body.KuiModalBody,
      null,
      _react2.default.createElement(
        'div',
        { 'data-test-subj': 'confirmModalBodyText' },
        message
      )
    ),
    _react2.default.createElement(
      _modal_footer.KuiModalFooter,
      null,
      _react2.default.createElement(
        _components.KuiButton,
        {
          buttonType: 'hollow',
          autoFocus: defaultFocusedButton === CANCEL_BUTTON,
          'data-test-subj': 'confirmModalCancelButton',
          onClick: onCancel
        },
        cancelButtonText
      ),
      _react2.default.createElement(
        _components.KuiButton,
        {
          buttonType: 'primary',
          autoFocus: defaultFocusedButton === CONFIRM_BUTTON,
          'data-test-subj': 'confirmModalConfirmButton',
          onClick: onConfirm
        },
        confirmButtonText
      )
    )
  );
}

KuiConfirmModal.propTypes = {
  children: _propTypes2.default.node,
  title: _propTypes2.default.string,
  cancelButtonText: _propTypes2.default.string,
  confirmButtonText: _propTypes2.default.string,
  onCancel: _propTypes2.default.func.isRequired,
  onConfirm: _propTypes2.default.func,
  className: _propTypes2.default.string,
  defaultFocusedButton: _propTypes2.default.oneOf(CONFIRM_MODAL_BUTTONS)
};
