'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.collectUiExports = collectUiExports;

var _ui_export_defaults = require('./ui_export_defaults');

var _ui_export_types = require('./ui_export_types');

var uiExportTypeReducers = _interopRequireWildcard(_ui_export_types);

var _plugin_discovery = require('../../plugin_discovery');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function collectUiExports(pluginSpecs) {
  return (0, _plugin_discovery.reduceExportSpecs)(pluginSpecs, uiExportTypeReducers, _ui_export_defaults.UI_EXPORT_DEFAULTS);
}
