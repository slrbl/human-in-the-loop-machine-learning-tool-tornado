'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kibana) {

  return new kibana.Plugin({
    uiExports: {
      visTypes: ['plugins/tile_map/tile_map_vis']
    }
  });
};

module.exports = exports['default'];
