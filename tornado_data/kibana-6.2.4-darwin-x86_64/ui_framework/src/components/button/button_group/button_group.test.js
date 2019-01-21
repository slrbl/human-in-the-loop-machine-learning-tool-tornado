'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _button_group = require('./button_group');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiButtonGroup', () => {
  describe('Baseline', () => {
    test('is rendered', () => {
      const $buttonGroup = (0, _enzyme.render)(_react2.default.createElement(_button_group.KuiButtonGroup, null));

      expect($buttonGroup).toMatchSnapshot();
    });
  });

  describe('Props', () => {
    describe('children', () => {
      test('is rendered', () => {
        const $buttonGroup = (0, _enzyme.render)(_react2.default.createElement(
          _button_group.KuiButtonGroup,
          null,
          'Hello'
        ));

        expect($buttonGroup).toMatchSnapshot();
      });
    });

    describe('isUnited', () => {
      test('renders the united class', () => {
        const $buttonGroup = (0, _enzyme.render)(_react2.default.createElement(_button_group.KuiButtonGroup, { isUnited: true }));

        expect($buttonGroup).toMatchSnapshot();
      });
    });
  });
});
