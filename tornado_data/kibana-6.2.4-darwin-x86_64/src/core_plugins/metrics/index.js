'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (kibana) {
  return new kibana.Plugin({
    require: ['kibana', 'elasticsearch'],

    uiExports: {
      visTypes: ['plugins/metrics/kbn_vis_types']
    },

    config(Joi) {
      return Joi.object({
        enabled: Joi.boolean().default(true),
        chartResolution: Joi.number().default(150),
        minimumBucketSize: Joi.number().default(10)
      }).default();
    },

    init(server) {
      (0, _fields2.default)(server);
      (0, _vis2.default)(server);
    }

  });
};

var _fields = require('./server/routes/fields');

var _fields2 = _interopRequireDefault(_fields);

var _vis = require('./server/routes/vis');

var _vis2 = _interopRequireDefault(_vis);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = exports['default'];
