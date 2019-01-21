'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UiBundle = undefined;

var _bluebird = require('bluebird');

var _fs = require('fs');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// We normalize all path separators to `/` in generated files
function normalizePath(path) {
  return path.replace(/[\\\/]+/g, '/');
}

class UiBundle {
  constructor(options) {
    const id = options.id,
          modules = options.modules,
          template = options.template,
          controller = options.controller;


    this._id = id;
    this._modules = modules;
    this._template = template;
    this._controller = controller;
  }

  getId() {
    return this._id;
  }

  getContext() {
    return this._controller.getContext();
  }

  getEntryPath() {
    return this._controller.resolvePath(`${this.getId()}.entry.js`);
  }

  getStylePath() {
    return this._controller.resolvePath(`${this.getId()}.style.css`);
  }

  getOutputPath() {
    return this._controller.resolvePath(`${this.getId()}.bundle.js`);
  }

  getRequires() {
    return this._modules.map(module => `require('${normalizePath(module)}');`);
  }

  renderContent() {
    return this._template(this);
  }

  readEntryFile() {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        const content = yield (0, _bluebird.fromNode)(function (cb) {
          return (0, _fs.readFile)(_this.getEntryPath(), cb);
        });
        return content.toString('utf8');
      } catch (e) {
        return null;
      }
    })();
  }

  writeEntryFile() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      return yield (0, _bluebird.fromNode)(function (cb) {
        return (0, _fs.writeFile)(_this2.getEntryPath(), _this2.renderContent(), 'utf8', cb);
      });
    })();
  }

  hasStyleFile() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      return yield (0, _bluebird.fromNode)(function (cb) {
        return (0, _fs.stat)(_this3.getStylePath(), function (error) {
          cb(null, !(error && error.code === 'ENOENT'));
        });
      });
    })();
  }

  touchStyleFile() {
    var _this4 = this;

    return _asyncToGenerator(function* () {
      return yield (0, _bluebird.fromNode)(function (cb) {
        return (0, _fs.writeFile)(_this4.getStylePath(), '', 'utf8', cb);
      });
    })();
  }

  clearBundleFile() {
    var _this5 = this;

    return _asyncToGenerator(function* () {
      try {
        yield (0, _bluebird.fromNode)(function (cb) {
          return (0, _fs.unlink)(_this5.getOutputPath(), cb);
        });
      } catch (e) {
        return null;
      }
    })();
  }

  isCacheValid() {
    var _this6 = this;

    return _asyncToGenerator(function* () {
      try {
        yield (0, _bluebird.fromNode)(function (cb) {
          return (0, _fs.stat)(_this6.getOutputPath(), cb);
        });
        return true;
      } catch (e) {
        return false;
      }
    })();
  }

  toJSON() {
    return {
      id: this._id,
      modules: this._modules,
      entryPath: this.getEntryPath(),
      outputPath: this.getOutputPath()
    };
  }
}
exports.UiBundle = UiBundle;
