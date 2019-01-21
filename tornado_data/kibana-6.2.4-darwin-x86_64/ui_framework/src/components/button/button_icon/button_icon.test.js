'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _button_icon = require('./button_icon');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiButtonIcon', () => {
  describe('Baseline', () => {
    test('is rendered', () => {
      const $buttonIcon = (0, _enzyme.render)(_react2.default.createElement(_button_icon.KuiButtonIcon, null));

      expect($buttonIcon).toMatchSnapshot();
    });
  });

  describe('Props', () => {
    describe('type', () => {
      _button_icon.ICON_TYPES.forEach(type => {
        describe(type, () => {
          test(`renders the ${type} class`, () => {
            const $buttonIcon = (0, _enzyme.render)(_react2.default.createElement(_button_icon.KuiButtonIcon, { type: type }));
            expect($buttonIcon).toMatchSnapshot();
          });
        });
      });
    });

    describe('className', () => {
      test('renders the classes', () => {
        const $buttonIcon = (0, _enzyme.render)(_react2.default.createElement(_button_icon.KuiButtonIcon, { className: 'testClass1 testClass2' }));

        expect($buttonIcon).toMatchSnapshot();
      });
    });
  });
});
