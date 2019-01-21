'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kibana) {

  return new kibana.Plugin({

    uiExports: {
      visTypes: ['plugins/markdown_vis/markdown_vis']
    }

  });
};

module.exports = exports['default'];
