'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('enzyme');

var _test = require('../../test');

var _services = require('../../services');

var _confirm_modal = require('./confirm_modal');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let onConfirm;
let onCancel;

beforeEach(() => {
  onConfirm = _sinon2.default.spy();
  onCancel = _sinon2.default.spy();
});

test('renders KuiConfirmModal', () => {
  const component = (0, _enzyme.render)(_react2.default.createElement(
    _confirm_modal.KuiConfirmModal,
    _extends({
      title: 'A confirmation modal',
      onCancel: () => {},
      onConfirm: onConfirm,
      cancelButtonText: 'Cancel Button Text',
      confirmButtonText: 'Confirm Button Text'
    }, _test.requiredProps),
    'This is a confirmation modal example'
  ));
  expect(component).toMatchSnapshot();
});

test('onConfirm', () => {
  const component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
    onCancel: onCancel,
    onConfirm: onConfirm,
    cancelButtonText: 'Cancel Button Text',
    confirmButtonText: 'Confirm Button Text'
  }));

  (0, _test.findTestSubject)(component, 'confirmModalConfirmButton').simulate('click');
  _sinon2.default.assert.calledOnce(onConfirm);
  _sinon2.default.assert.notCalled(onCancel);
});

describe('onCancel', () => {
  test('triggerd by click', () => {
    const component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel,
      onConfirm: onConfirm,
      cancelButtonText: 'Cancel Button Text',
      confirmButtonText: 'Confirm Button Text'
    }));

    (0, _test.findTestSubject)(component, 'confirmModalCancelButton').simulate('click');
    _sinon2.default.assert.notCalled(onConfirm);
    _sinon2.default.assert.calledOnce(onCancel);
  });

  test('triggered by esc key', () => {
    const component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel,
      onConfirm: onConfirm,
      cancelButtonText: 'Cancel Button Text',
      confirmButtonText: 'Confirm Button Text',
      'data-test-subj': 'modal'
    }));

    (0, _test.findTestSubject)(component, 'modal').simulate('keydown', { keyCode: _services.keyCodes.ESCAPE });
    _sinon2.default.assert.notCalled(onConfirm);
    _sinon2.default.assert.calledOnce(onCancel);
  });
});

describe('defaultFocusedButton', () => {
  test('is cancel', () => {
    const component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel,
      onConfirm: onConfirm,
      cancelButtonText: 'Cancel Button Text',
      confirmButtonText: 'Confirm Button Text',
      defaultFocusedButton: _confirm_modal.CANCEL_BUTTON
    }));

    const button = (0, _test.findTestSubject)(component, 'confirmModalCancelButton').getDOMNode();
    expect(document.activeElement).toEqual(button);
  });

  test('is confirm', () => {
    const component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel,
      onConfirm: onConfirm,
      cancelButtonText: 'Cancel Button Text',
      confirmButtonText: 'Confirm Button Text',
      defaultFocusedButton: _confirm_modal.CONFIRM_BUTTON
    }));

    const button = (0, _test.findTestSubject)(component, 'confirmModalConfirmButton').getDOMNode();
    expect(document.activeElement).toEqual(button);
  });

  test('when not given gives focus to the modal', () => {
    const component = (0, _enzyme.mount)(_react2.default.createElement(_confirm_modal.KuiConfirmModal, {
      onCancel: onCancel,
      onConfirm: onConfirm,
      cancelButtonText: 'Cancel Button Text',
      confirmButtonText: 'Confirm Button Text'
    }));
    expect(document.activeElement).toEqual(component.getDOMNode().firstChild);
  });
});
