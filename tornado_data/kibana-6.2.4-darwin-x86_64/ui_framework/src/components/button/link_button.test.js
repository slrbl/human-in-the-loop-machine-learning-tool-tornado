'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _button = require('./button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiLinkButton', () => {
  describe('Baseline', () => {
    test('is rendered', () => {
      const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiLinkButton, { 'aria-label': 'aria label' }));

      expect($button).toMatchSnapshot();
    });

    test('HTML attributes are rendered (and disabled renders a class)', () => {
      const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiLinkButton, {
        'aria-label': 'aria label',
        className: 'testClass1 testClass2',
        'data-test-subj': 'test subject string',
        disabled: true,
        type: 'submit',
        href: '#',
        target: '_blank'
      }));

      expect($button).toMatchSnapshot();
    });
  });

  describe('Props', () => {
    describe('buttonType', () => {
      _button.BUTTON_TYPES.forEach(buttonType => {
        describe(buttonType, () => {
          test(`renders the ${buttonType} class`, () => {
            const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiLinkButton, {
              buttonType: buttonType,
              'aria-label': 'aria label'
            }));
            expect($button).toMatchSnapshot();
          });
        });
      });
    });

    describe('icon', () => {
      test('is rendered with children', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(
          _button.KuiLinkButton,
          { icon: 'Icon' },
          'Hello'
        ));

        expect($button).toMatchSnapshot();
      });

      test('is rendered without children', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiLinkButton, {
          icon: 'Icon',
          'aria-label': 'aria label'
        }));

        expect($button).toMatchSnapshot();
      });
    });

    describe('iconPosition', () => {
      test('moves the icon to the right', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(
          _button.KuiLinkButton,
          {
            icon: 'Icon',
            iconPosition: 'right'
          },
          'Hello'
        ));

        expect($button).toMatchSnapshot();
      });
    });

    describe('children', () => {
      test('is rendered', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(
          _button.KuiLinkButton,
          null,
          'Hello'
        ));

        expect($button).toMatchSnapshot();
      });
    });

    describe('isLoading', () => {
      test('renders a spinner', () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiLinkButton, {
          isLoading: true,
          'aria-label': 'aria label'
        }));

        expect($button).toMatchSnapshot();
      });

      test(`doesn't render the icon prop`, () => {
        const $button = (0, _enzyme.render)(_react2.default.createElement(_button.KuiLinkButton, {
          isLoading: true,
          icon: 'Icon',
          'aria-label': 'aria label'
        }));

        expect($button).toMatchSnapshot();
      });
    });
  });
});
