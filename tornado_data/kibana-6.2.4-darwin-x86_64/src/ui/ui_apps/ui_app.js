'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiApp = undefined;

var _ui_nav_links = require('../ui_nav_links');

class UiApp {
  constructor(kbnServer, spec) {
    const pluginId = spec.pluginId;
    var _spec$id = spec.id;
    const id = _spec$id === undefined ? pluginId : _spec$id,
          main = spec.main,
          title = spec.title;
    var _spec$order = spec.order;
    const order = _spec$order === undefined ? 0 : _spec$order,
          description = spec.description,
          icon = spec.icon,
          hidden = spec.hidden,
          linkToLastSubUrl = spec.linkToLastSubUrl,
          listed = spec.listed;
    var _spec$templateName = spec.templateName;
    const templateName = _spec$templateName === undefined ? 'ui_app' : _spec$templateName,
          injectVars = spec.injectVars;
    var _spec$url = spec.url;
    const url = _spec$url === undefined ? `/app/${id}` : _spec$url;
    var _spec$uses = spec.uses;
    const uses = _spec$uses === undefined ? [] : _spec$uses;


    if (!id) {
      throw new Error('Every app must specify an id');
    }

    this._id = id;
    this._main = main;
    this._title = title;
    this._order = order;
    this._description = description;
    this._icon = icon;
    this._linkToLastSubUrl = linkToLastSubUrl;
    this._hidden = hidden;
    this._listed = listed;
    this._templateName = templateName;
    this._url = url;
    this._injectedVarsProvider = injectVars;
    this._pluginId = pluginId;
    this._kbnServer = kbnServer;

    if (this._pluginId && !this._getPlugin()) {
      throw new Error(`Unknown plugin id "${this._pluginId}"`);
    }

    var _kbnServer$uiExports$ = kbnServer.uiExports.appExtensions;
    const appExtensions = _kbnServer$uiExports$ === undefined ? [] : _kbnServer$uiExports$;

    this._modules = [].concat(this._main || [], uses
    // flatten appExtensions for used types
    .reduce((acc, type) => acc.concat(appExtensions[type] || []), [])
    // de-dupe app extension module ids
    .reduce((acc, item) => !item || acc.includes(item) ? acc : acc.concat(item), [])
    // sort app extension module ids alphabetically
    .sort((a, b) => a.localeCompare(b)));

    if (!this.isHidden()) {
      // unless an app is hidden it gets a navlink, but we only respond to `getNavLink()`
      // if the app is also listed. This means that all apps in the kibanaPayload will
      // have a navLink property since that list includes all normally accessible apps
      this._navLink = new _ui_nav_links.UiNavLink(kbnServer.config.get('server.basePath'), {
        id: this._id,
        title: this._title,
        order: this._order,
        description: this._description,
        icon: this._icon,
        url: this._url,
        linkToLastSubUrl: this._linkToLastSubUrl
      });
    }
  }

  getId() {
    return this._id;
  }

  getPluginId() {
    const plugin = this._getPlugin();
    return plugin ? plugin.id : undefined;
  }

  getTemplateName() {
    return this._templateName;
  }

  isHidden() {
    return !!this._hidden;
  }

  isListed() {
    return !this.isHidden() && (this._listed == null || !!this._listed);
  }

  getNavLink() {
    if (this.isListed()) {
      return this._navLink;
    }
  }

  getInjectedVars() {
    const provider = this._injectedVarsProvider;
    const plugin = this._getPlugin();

    if (!provider) {
      return;
    }

    return provider.call(plugin, plugin ? plugin.getServer() : this._kbnServer.server, plugin ? plugin.getOptions() : undefined);
  }

  getModules() {
    return this._modules;
  }

  _getPlugin() {
    const pluginId = this._pluginId;
    const plugins = this._kbnServer.plugins;


    return pluginId ? plugins.find(plugin => plugin.id === pluginId) : undefined;
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      description: this._description,
      icon: this._icon,
      main: this._main,
      navLink: this._navLink,
      linkToLastSubUrl: this._linkToLastSubUrl
    };
  }
}
exports.UiApp = UiApp;
