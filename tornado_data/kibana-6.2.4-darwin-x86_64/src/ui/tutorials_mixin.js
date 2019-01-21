'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialsMixin = tutorialsMixin;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _tutorial_schema = require('../core_plugins/kibana/common/tutorials/tutorial_schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tutorialsMixin(kbnServer, server) {
  const tutorials = [];

  server.decorate('server', 'getTutorials', () => {
    return _lodash2.default.cloneDeep(tutorials);
  });

  server.decorate('server', 'registerTutorial', specProvider => {
    var _Joi$validate = _joi2.default.validate(specProvider(), _tutorial_schema.tutorialSchema);

    const error = _Joi$validate.error,
          value = _Joi$validate.value;


    if (error) {
      throw new Error(`Unable to register tutorial spec because its invalid. ${error}`);
    }

    tutorials.push(value);
  });
}
