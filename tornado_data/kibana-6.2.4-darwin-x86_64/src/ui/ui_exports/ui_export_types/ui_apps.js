'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = exports.apps = undefined;

var _lodash = require('lodash');

var _reduce = require('./reduce');

var _modify_reduce = require('./modify_reduce');

function applySpecDefaults(spec, type, pluginSpec) {
  const pluginId = pluginSpec.getId();
  var _spec$id = spec.id;
  const id = _spec$id === undefined ? pluginId : _spec$id,
        main = spec.main,
        title = spec.title;
  var _spec$order = spec.order;
  const order = _spec$order === undefined ? 0 : _spec$order;
  var _spec$description = spec.description;
  const description = _spec$description === undefined ? '' : _spec$description,
        icon = spec.icon;
  var _spec$hidden = spec.hidden;
  const hidden = _spec$hidden === undefined ? false : _spec$hidden;
  var _spec$linkToLastSubUr = spec.linkToLastSubUrl;
  const linkToLastSubUrl = _spec$linkToLastSubUr === undefined ? true : _spec$linkToLastSubUr;
  var _spec$listed = spec.listed;
  const listed = _spec$listed === undefined ? !hidden : _spec$listed;
  var _spec$templateName = spec.templateName;
  const templateName = _spec$templateName === undefined ? 'ui_app' : _spec$templateName;
  var _spec$injectVars = spec.injectVars;
  const injectVars = _spec$injectVars === undefined ? _lodash.noop : _spec$injectVars;
  var _spec$url = spec.url;
  const url = _spec$url === undefined ? `/app/${id}` : _spec$url;
  var _spec$uses = spec.uses;
  const uses = _spec$uses === undefined ? [] : _spec$uses;


  return {
    pluginId,
    id,
    main,
    title,
    order,
    description,
    icon,
    hidden,
    linkToLastSubUrl,
    listed,
    templateName,
    injectVars,
    url,
    uses: (0, _lodash.uniq)([...uses, 'chromeNavControls', 'hacks'])
  };
}

const apps = exports.apps = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('uiAppSpecs'), (0, _modify_reduce.mapSpec)(applySpecDefaults), _reduce.flatConcatAtType);
const app = exports.app = (0, _modify_reduce.wrap)((0, _modify_reduce.alias)('uiAppSpecs'), (0, _modify_reduce.mapSpec)(applySpecDefaults), _reduce.flatConcatAtType);
