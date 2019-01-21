'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UI_EXPORT_DEFAULTS = undefined;

var _path = require('path');

const ROOT = (0, _path.dirname)(require.resolve('../../../package.json'));

const UI_EXPORT_DEFAULTS = exports.UI_EXPORT_DEFAULTS = {
  webpackNoParseRules: [/node_modules[\/\\](angular|elasticsearch-browser)[\/\\]/, /node_modules[\/\\](mocha|moment)[\/\\]/],

  webpackAliases: {
    ui: (0, _path.resolve)(ROOT, 'src/ui/public'),
    ui_framework: (0, _path.resolve)(ROOT, 'ui_framework'),
    packages: (0, _path.resolve)(ROOT, 'packages'),
    test_harness: (0, _path.resolve)(ROOT, 'src/test_harness/public'),
    querystring: 'querystring-browser',
    moment$: (0, _path.resolve)(ROOT, 'webpackShims/moment'),
    'moment-timezone$': (0, _path.resolve)(ROOT, 'webpackShims/moment-timezone')
  },

  translationPaths: [(0, _path.resolve)(ROOT, 'src/ui/ui_i18n/translations/en.json')],

  appExtensions: {
    fieldFormatEditors: ['ui/field_format_editor/register'],
    visRequestHandlers: ['ui/vis/request_handlers/courier', 'ui/vis/request_handlers/none'],
    visResponseHandlers: ['ui/vis/response_handlers/basic', 'ui/vis/response_handlers/none', 'ui/vis/response_handlers/tabify'],
    visEditorTypes: ['ui/vis/editors/default/default'],
    embeddableFactories: ['plugins/kibana/visualize/embeddable/visualize_embeddable_factory_provider', 'plugins/kibana/discover/embeddable/search_embeddable_factory_provider']
  }
};
