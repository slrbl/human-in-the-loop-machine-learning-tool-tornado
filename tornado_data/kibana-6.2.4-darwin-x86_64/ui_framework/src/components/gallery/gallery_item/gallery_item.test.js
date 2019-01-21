'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _enzyme = require('enzyme');

var _required_props = require('../../../test/required_props');

var _gallery_item = require('./gallery_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

test('renders KuiGalleryItem with href', () => {
  const component = _react2.default.createElement(
    _gallery_item.KuiGalleryItem,
    _extends({ href: '#' }, _required_props.requiredProps),
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

test('renders KuiGalleryItem with onClick', () => {
  const component = _react2.default.createElement(
    _gallery_item.KuiGalleryItem,
    _extends({ onClick: () => {} }, _required_props.requiredProps),
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

test('renders KuiGalleryItem without href and onClick', () => {
  const component = _react2.default.createElement(
    _gallery_item.KuiGalleryItem,
    _required_props.requiredProps,
    'children'
  );
  expect((0, _enzyme.render)(component)).toMatchSnapshot();
});

test('onClick on KuiGalleryItem is not triggered without click', () => {
  const onClickSpy = _sinon2.default.spy();
  (0, _enzyme.render)(_react2.default.createElement(
    _gallery_item.KuiGalleryItem,
    _extends({ onClick: onClickSpy }, _required_props.requiredProps),
    'children'
  ));
  _sinon2.default.assert.notCalled(onClickSpy);
});

test('onClick on KuiGalleryItem is triggered when clicked', () => {
  const onClickSpy = _sinon2.default.spy();
  const element = (0, _enzyme.shallow)(_react2.default.createElement(
    _gallery_item.KuiGalleryItem,
    _extends({ onClick: onClickSpy }, _required_props.requiredProps),
    'children'
  ));
  element.simulate('click');
  _sinon2.default.assert.calledOnce(onClickSpy);
});

test('KuiGalleryItem will throw when specified href and onClick', () => {
  const consoleError = _sinon2.default.stub(console, 'error');
  (0, _enzyme.render)(_react2.default.createElement(
    _gallery_item.KuiGalleryItem,
    _extends({ href: '#', onClick: () => {} }, _required_props.requiredProps),
    'children'
  ));
  expect(consoleError.calledOnce).toBe(true);
  const msg = consoleError.getCalls()[0].args[0];
  expect(msg).toContain('Failed prop type');
  console.error.restore();
});
