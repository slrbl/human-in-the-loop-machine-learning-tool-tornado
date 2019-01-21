'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _info_button = require('./info_button');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiInfoButton', () => {
  describe('Baseline', () => {
    test('is rendered', () => {
      const $button = (0, _enzyme.render)(_react2.default.createElement(_info_button.KuiInfoButton, null));

      expect($button).toMatchSnapshot();
    });

    test('HTML attributes are rendered', () => {
      const $button = (0, _enzyme.render)(_react2.default.createElement(_info_button.KuiInfoButton, {
        'aria-label': 'aria label',
        className: 'testClass1 testClass2',
        'data-test-subj': 'test subject string'
      }));

      expect($button).toMatchSnapshot();
    });
  });
});
