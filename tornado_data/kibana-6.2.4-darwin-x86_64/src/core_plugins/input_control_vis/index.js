'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kibana) {
  return new kibana.Plugin({
    uiExports: {
      visTypes: ['plugins/input_control_vis/register_vis']
    }
  });
};

module.exports = exports['default'];
