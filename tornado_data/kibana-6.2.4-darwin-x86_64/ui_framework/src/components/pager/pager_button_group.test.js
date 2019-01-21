'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('enzyme');

var _test = require('../../test');

var _pager_button_group = require('./pager_button_group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let onNext;
let onPrevious;

beforeEach(() => {
  onNext = _sinon2.default.spy();
  onPrevious = _sinon2.default.spy();
});

test('renders KuiPagerButtonGroup', () => {
  const component = _react2.default.createElement(_pager_button_group.KuiPagerButtonGroup, _extends({
    onNext: onNext,
    onPrevious: onPrevious,
    hasNext: true,
    hasPrevious: true
  }, _test.requiredProps));
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

describe('property', () => {
  function findPreviousButton(pager) {
    return (0, _test.findTestSubject)(pager, 'pagerPreviousButton');
  }

  function findNextButton(pager) {
    return (0, _test.findTestSubject)(pager, 'pagerNextButton');
  }

  test('onNext', () => {
    const component = _react2.default.createElement(_pager_button_group.KuiPagerButtonGroup, {
      onNext: onNext,
      onPrevious: onPrevious,
      hasNext: true,
      hasPrevious: true
    });
    const pager = (0, _enzyme.mount)(component);
    findNextButton(pager).simulate('click');
    _sinon2.default.assert.calledOnce(onNext);
    _sinon2.default.assert.notCalled(onPrevious);
  });

  test('onPrevious', () => {
    const component = _react2.default.createElement(_pager_button_group.KuiPagerButtonGroup, {
      onNext: onNext,
      onPrevious: onPrevious,
      hasNext: true,
      hasPrevious: true
    });
    const pager = (0, _enzyme.mount)(component);
    findPreviousButton(pager).simulate('click');
    _sinon2.default.assert.calledOnce(onPrevious);
    _sinon2.default.assert.notCalled(onNext);
  });

  describe('hasNext', () => {
    test('is enabled when true', () => {
      const component = _react2.default.createElement(_pager_button_group.KuiPagerButtonGroup, {
        onNext: onNext,
        onPrevious: onPrevious,
        hasNext: true,
        hasPrevious: true
      });
      const pager = (0, _enzyme.mount)(component);
      const isDisabled = findNextButton(pager).prop('disabled');
      expect(isDisabled).toBe(false);
    });

    test('is disabled when false', () => {
      const component = _react2.default.createElement(_pager_button_group.KuiPagerButtonGroup, {
        onNext: onNext,
        onPrevious: onPrevious,
        hasNext: false,
        hasPrevious: true
      });
      const pager = (0, _enzyme.mount)(component);
      const isDisabled = findNextButton(pager).prop('disabled');
      expect(isDisabled).toBe(true);
    });
  });

  describe('hasPrevious', () => {
    test('is enabled when true', () => {
      const component = _react2.default.createElement(_pager_button_group.KuiPagerButtonGroup, {
        onNext: onNext,
        onPrevious: onPrevious,
        hasNext: true,
        hasPrevious: true
      });
      const pager = (0, _enzyme.mount)(component);
      const isDisabled = findPreviousButton(pager).prop('disabled');
      expect(isDisabled).toBe(false);
    });

    test('is disabled when false', () => {
      const component = _react2.default.createElement(_pager_button_group.KuiPagerButtonGroup, {
        onNext: onNext,
        onPrevious: onPrevious,
        hasNext: true,
        hasPrevious: false
      });
      const pager = (0, _enzyme.mount)(component);
      const isDisabled = findPreviousButton(pager).prop('disabled');
      expect(isDisabled).toBe(true);
    });
  });
});
