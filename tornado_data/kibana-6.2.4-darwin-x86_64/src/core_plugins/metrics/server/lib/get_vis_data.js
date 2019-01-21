'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _get_panel_data = require('./vis_data/get_panel_data');

var _get_panel_data2 = _interopRequireDefault(_get_panel_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function getVisData(req) {
  const promises = req.payload.panels.map((0, _get_panel_data2.default)(req));
  return Promise.all(promises).then(res => {
    return res.reduce((acc, data) => {
      return _lodash2.default.assign(acc, data);
    }, {});
  });
}

exports.default = getVisData;
module.exports = exports['default'];
