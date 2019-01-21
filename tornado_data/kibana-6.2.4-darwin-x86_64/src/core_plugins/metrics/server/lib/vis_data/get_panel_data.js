'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getPanelData;

var _get_table_data = require('./get_table_data');

var _get_series_data = require('./get_series_data');

function getPanelData(req) {
  return panel => {
    if (panel.type === 'table') return (0, _get_table_data.getTableData)(req, panel);
    return (0, _get_series_data.getSeriesData)(req, panel);
  };
}
module.exports = exports['default'];
