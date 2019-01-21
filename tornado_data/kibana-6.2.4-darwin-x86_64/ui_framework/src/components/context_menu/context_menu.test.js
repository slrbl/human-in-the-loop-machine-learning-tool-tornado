'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _enzyme = require('enzyme');

var _test = require('../../test');

var _context_menu = require('./context_menu');

var _timers = require('timers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const panel2 = {
  id: 2,
  title: '2',
  content: _react2.default.createElement(
    'div',
    null,
    '2'
  )
};

const panel1 = {
  id: 1,
  title: '1',
  items: [{
    name: '2a',
    panel: 2
  }, {
    name: '2b',
    panel: 2
  }, {
    name: '2c',
    panel: 2
  }]
};

const panel0 = {
  id: 0,
  title: '0',
  items: [{
    name: '1',
    panel: 1
  }]
};

const panels = [panel0, panel1, panel2];

const tick = (ms = 0) => new Promise(resolve => {
  (0, _timers.setTimeout)(resolve, ms);
});

describe('KuiContextMenu', () => {
  test('is rendered', () => {
    const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu.KuiContextMenu, _test.requiredProps));

    expect(component).toMatchSnapshot();
  });

  describe('props', () => {
    describe('panels and initialPanelId', () => {
      it('renders the referenced panel', () => {
        const component = (0, _enzyme.render)(_react2.default.createElement(_context_menu.KuiContextMenu, {
          panels: panels,
          initialPanelId: 2
        }));

        expect(component).toMatchSnapshot();
      });

      it('allows you to click the title button to go back to the previous panel', _asyncToGenerator(function* () {
        const component = (0, _enzyme.mount)(_react2.default.createElement(_context_menu.KuiContextMenu, {
          panels: panels,
          initialPanelId: 2
        }));

        yield tick(20);

        expect((0, _test.takeMountedSnapshot)(component)).toMatchSnapshot();

        // Navigate to a different panel.
        component.find('[data-test-subj="contextMenuPanelTitleButton"]').simulate('click');

        yield tick(20);

        expect((0, _test.takeMountedSnapshot)(component)).toMatchSnapshot();
      }));
    });
  });
});
