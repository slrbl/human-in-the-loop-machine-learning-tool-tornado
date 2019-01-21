'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kibana) {

  return new kibana.Plugin({

    uiExports: {
      visTypes: ['plugins/metric_vis/metric_vis']
    }

  });
};

module.exports = exports['default'];
