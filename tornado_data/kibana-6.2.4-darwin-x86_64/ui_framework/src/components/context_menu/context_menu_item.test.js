'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _sinon = require('sinon');

var _sinon2 = _interopRequireDefault(_sinon);

var _required_props = require('../../test/required_props');

var _context_menu_item = require('./context_menu_item');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiContextMenuItem', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(
      _context_menu_item.KuiContextMenuItem,
      _required_props.requiredProps,
      'Hello'
    ));

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('icon', () => {
      test('is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu_item.KuiContextMenuItem, { icon: _react2.default.createElement('span', { className: 'kuiIcon fa-user' }) }));

        expect(component).toMatchSnapshot();
      });
    });

    describe('disabled', () => {
      test('is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu_item.KuiContextMenuItem, { disabled: true }));

        expect(component).toMatchSnapshot();
      });
    });

    describe('onClick', () => {
      test(`isn't called upon instantiation`, () => {
        const onClickHandler = _sinon2.default.stub();

        (0, _enzyme.shallow)(_react2.default.createElement(_context_menu_item.KuiContextMenuItem, { onClick: onClickHandler }));

        _sinon2.default.assert.notCalled(onClickHandler);
      });

      test('is called when the item is clicked', () => {
        const onClickHandler = _sinon2.default.stub();

        const component = (0, _enzyme.shallow)(_react2.default.createElement(_context_menu_item.KuiContextMenuItem, { onClick: onClickHandler }));

        component.simulate('click');

        _sinon2.default.assert.calledOnce(onClickHandler);
      });

      test('is not called when the item is clicked but set to disabled', () => {
        const onClickHandler = _sinon2.default.stub();

        const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu_item.KuiContextMenuItem, { disabled: true, onClick: onClickHandler }));

        component.simulate('click');

        _sinon2.default.assert.notCalled(onClickHandler);
      });
    });

    describe('hasPanel', () => {
      test('is rendered', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu_item.KuiContextMenuItem, { hasPanel: true }));

        expect(component).toMatchSnapshot();
      });
    });
  });
});
