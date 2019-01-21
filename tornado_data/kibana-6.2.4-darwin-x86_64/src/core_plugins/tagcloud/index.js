'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kibana) {

  return new kibana.Plugin({
    uiExports: {
      visTypes: ['plugins/tagcloud/tag_cloud_vis']
    }
  });
};

module.exports = exports['default'];
