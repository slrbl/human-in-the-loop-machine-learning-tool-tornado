'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class UiNavLink {
  constructor(urlBasePath, spec) {
    const id = spec.id,
          title = spec.title;
    var _spec$order = spec.order;
    const order = _spec$order === undefined ? 0 : _spec$order,
          url = spec.url,
          subUrlBase = spec.subUrlBase,
          description = spec.description,
          icon = spec.icon;
    var _spec$linkToLastSubUr = spec.linkToLastSubUrl;
    const linkToLastSubUrl = _spec$linkToLastSubUr === undefined ? true : _spec$linkToLastSubUr;
    var _spec$hidden = spec.hidden;
    const hidden = _spec$hidden === undefined ? false : _spec$hidden;
    var _spec$disabled = spec.disabled;
    const disabled = _spec$disabled === undefined ? false : _spec$disabled;
    var _spec$tooltip = spec.tooltip;
    const tooltip = _spec$tooltip === undefined ? '' : _spec$tooltip;


    this._id = id;
    this._title = title;
    this._order = order;
    this._url = `${urlBasePath || ''}${url}`;
    this._subUrlBase = `${urlBasePath || ''}${subUrlBase || url}`;
    this._description = description;
    this._icon = icon;
    this._linkToLastSubUrl = linkToLastSubUrl;
    this._hidden = hidden;
    this._disabled = disabled;
    this._tooltip = tooltip;
  }

  getOrder() {
    return this._order;
  }

  toJSON() {
    return {
      id: this._id,
      title: this._title,
      order: this._order,
      url: this._url,
      subUrlBase: this._subUrlBase,
      description: this._description,
      icon: this._icon,
      linkToLastSubUrl: this._linkToLastSubUrl,
      hidden: this._hidden,
      disabled: this._disabled,
      tooltip: this._tooltip
    };
  }
}
exports.UiNavLink = UiNavLink;
