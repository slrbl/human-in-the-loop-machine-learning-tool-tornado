"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getIntervalAndTimefield;
function getIntervalAndTimefield(panel, series = {}) {
  const timeField = series.override_index_pattern && series.series_time_field || panel.time_field;
  const interval = series.override_index_pattern && series.series_interval || panel.interval;
  return { timeField, interval };
}
module.exports = exports["default"];
