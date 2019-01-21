'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('enzyme');

var _test = require('../../test');

var _pager = require('./pager');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let onPreviousPage;
let onNextPage;

beforeEach(() => {
  onPreviousPage = _sinon2.default.spy();
  onNextPage = _sinon2.default.spy();
});

test('renders KuiPager', () => {
  const component = _react2.default.createElement(_pager.KuiPager, _extends({
    hasPreviousPage: false,
    hasNextPage: true,
    onPreviousPage: onPreviousPage,
    onNextPage: onNextPage,
    startNumber: 1,
    endNumber: 10,
    totalItems: 20
  }, _test.requiredProps));
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

describe('property', () => {
  describe('hasPreviousPage', () => {
    test('disables previous button when false', () => {
      const component = _react2.default.createElement(_pager.KuiPager, {
        hasPreviousPage: false,
        hasNextPage: true,
        onPreviousPage: onPreviousPage,
        onNextPage: onNextPage,
        startNumber: 1,
        endNumber: 10,
        totalItems: 20
      });
      expect((0, _enzyme.render)(component)).toMatchSnapshot();
    });
  });

  describe('hasNextPage', () => {
    test('disables next button when false', () => {
      const component = _react2.default.createElement(_pager.KuiPager, {
        hasPreviousPage: true,
        hasNextPage: false,
        onPreviousPage: onPreviousPage,
        onNextPage: onNextPage,
        startNumber: 1,
        endNumber: 10,
        totalItems: 20
      });
      expect((0, _enzyme.render)(component)).toMatchSnapshot();
    });
  });

  describe('onPreviousPage', () => {
    test('is called when clicked', () => {
      const component = _react2.default.createElement(_pager.KuiPager, {
        hasPreviousPage: true,
        hasNextPage: true,
        onPreviousPage: onPreviousPage,
        onNextPage: onNextPage,
        startNumber: 1,
        endNumber: 10,
        totalItems: 20
      });
      const pager = (0, _enzyme.mount)(component);
      (0, _test.findTestSubject)(pager, 'pagerPreviousButton').simulate('click');
      _sinon2.default.assert.calledOnce(onPreviousPage);
      _sinon2.default.assert.notCalled(onNextPage);
    });
  });

  describe('onNextPage', () => {
    test('is called when clicked', () => {
      const component = _react2.default.createElement(_pager.KuiPager, {
        hasPreviousPage: true,
        hasNextPage: true,
        onPreviousPage: onPreviousPage,
        onNextPage: onNextPage,
        startNumber: 1,
        endNumber: 10,
        totalItems: 20
      });
      const pager = (0, _enzyme.mount)(component);
      (0, _test.findTestSubject)(pager, 'pagerNextButton').simulate('click');
      _sinon2.default.assert.calledOnce(onNextPage);
      _sinon2.default.assert.notCalled(onPreviousPage);
    });
  });
});
