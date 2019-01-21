'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.aliases = exports.visTypeEnhancers = exports.home = exports.hacks = exports.docViews = exports.devTools = exports.managementSections = exports.navbarExtensions = exports.chromeNavControls = exports.spyModes = exports.fieldFormatEditors = exports.fieldFormats = exports.embeddableFactories = exports.savedObjectTypes = exports.visEditorTypes = exports.visRequestHandlers = exports.visResponseHandlers = exports.visTypes = undefined;

var _reduce = require('./reduce');

var _modify_reduce = require('./modify_reduce');

/**
 *  Reducer "preset" that merges named "first-class" appExtensions by
 *  converting them into objects and then concatenating the values of those objects
 *  @type {Function}
 */
const appExtension = (0, _modify_reduce.wrap)((0, _modify_reduce.mapSpec)((spec, type) => ({ [type]: spec })), (0, _modify_reduce.alias)('appExtensions'), _reduce.flatConcatValuesAtType);

// plain extension groups produce lists of modules that will be required by the entry
// files to include extensions of specific types into specific apps
const visTypes = exports.visTypes = appExtension;
const visResponseHandlers = exports.visResponseHandlers = appExtension;
const visRequestHandlers = exports.visRequestHandlers = appExtension;
const visEditorTypes = exports.visEditorTypes = appExtension;
const savedObjectTypes = exports.savedObjectTypes = appExtension;
const embeddableFactories = exports.embeddableFactories = appExtension;
const fieldFormats = exports.fieldFormats = appExtension;
const fieldFormatEditors = exports.fieldFormatEditors = appExtension;
const spyModes = exports.spyModes = appExtension;
const chromeNavControls = exports.chromeNavControls = appExtension;
const navbarExtensions = exports.navbarExtensions = appExtension;
const managementSections = exports.managementSections = appExtension;
const devTools = exports.devTools = appExtension;
const docViews = exports.docViews = appExtension;
const hacks = exports.hacks = appExtension;
const home = exports.home = appExtension;

// aliases visTypeEnhancers to the visTypes group
const visTypeEnhancers = exports.visTypeEnhancers = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('visTypes'), appExtension);

// adhoc extension groups can define new extension groups on the fly
// so that plugins could concat their own
const aliases = exports.aliases = _reduce.flatConcatValuesAtType;
