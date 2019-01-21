'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kibana) {

  return new kibana.Plugin({

    uiExports: {
      docViews: ['plugins/kbn_doc_views/kbn_doc_views']
    }

  });
};

module.exports = exports['default'];
