'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BinderFor = undefined;

var _binder = require('./binder');

class BinderFor extends _binder.BinderBase {
  constructor(emitter) {
    super();
    this.emitter = emitter;
  }

  on(...args) {
    super.on(this.emitter, ...args);
  }
}
exports.BinderFor = BinderFor;
