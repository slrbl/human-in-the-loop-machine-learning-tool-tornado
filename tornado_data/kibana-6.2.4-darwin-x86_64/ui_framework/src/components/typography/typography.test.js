'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _required_props = require('../../test/required_props');

var _typography = require('./typography');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('KuiTitle', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(
      _typography.KuiTitle,
      _required_props.requiredProps,
      _react2.default.createElement(
        'h1',
        null,
        'Hello'
      )
    ));

    expect(component).toMatchSnapshot();
  });

  describe('renders size', () => {
    _typography.SIZES.forEach(size => {
      test(size, () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(
          _typography.KuiTitle,
          { size: size },
          _react2.default.createElement(
            'h1',
            null,
            'Hello'
          )
        ));

        expect(component).toMatchSnapshot();
      });
    });
  });
});

describe('KuiText', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(
      _typography.KuiText,
      _required_props.requiredProps,
      _react2.default.createElement(
        'h1',
        null,
        'Hello'
      )
    ));

    expect(component).toMatchSnapshot();
  });
});
