'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ON_PREM_INSTRUCTIONS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _instruction_variant = require('../../../common/tutorials/instruction_variant');

var _apm_server_instructions = require('./apm_server_instructions');

var _apm_client_instructions = require('./apm_client_instructions');

const ON_PREM_INSTRUCTIONS = exports.ON_PREM_INSTRUCTIONS = {
  instructionSets: [{
    title: 'APM Server',
    instructionVariants: [{
      id: _instruction_variant.INSTRUCTION_VARIANT.OSX,
      instructions: [_extends({}, _apm_server_instructions.DOWNLOAD_SERVER, {
        commands: ['curl -L -O https://artifacts.elastic.co/downloads/apm-server/apm-server-6.2.0-darwin-x86_64.tar.gz', 'tar xzvf apm-server-6.2.0-darwin-x86_64.tar.gz', 'cd apm-server-6.2.0-darwin-x86_64/']
      }), ..._apm_server_instructions.UNIX_FAMILY_SERVER_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.DEB,
      instructions: [_extends({}, _apm_server_instructions.DOWNLOAD_SERVER, {
        commands: ['curl -L -O https://artifacts.elastic.co/downloads/apm-server/apm-server-6.2.0-amd64.deb', 'sudo dpkg -i apm-server-6.2.0-amd64.deb'],
        textPost: 'Looking for the 32 bits packages? See the [Download page]({config.docs.base_url}downloads/apm/apm-server).'
      }), ..._apm_server_instructions.UNIX_FAMILY_SERVER_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.RPM,
      instructions: [_extends({}, _apm_server_instructions.DOWNLOAD_SERVER, {
        commands: ['curl -L -O https://artifacts.elastic.co/downloads/apm-server/apm-server-6.2.0-x86_64.rpm', 'sudo rpm -vi apm-server-6.2.0-x86_64.rpm'],
        textPost: 'Looking for the 32 bits packages? See the [Download page]({config.docs.base_url}downloads/apm/apm-server).'
      }), ..._apm_server_instructions.UNIX_FAMILY_SERVER_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.WINDOWS,
      instructions: _apm_server_instructions.WINDOWS_SERVER_INSTRUCTIONS
    }]
  }, {
    title: 'APM Agents',
    instructionVariants: [{
      id: _instruction_variant.INSTRUCTION_VARIANT.NODE,
      instructions: _apm_client_instructions.NODE_CLIENT_INSTRUCTIONS
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.DJANGO,
      instructions: _apm_client_instructions.DJANGO_CLIENT_INSTRUCTIONS
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.FLASK,
      instructions: _apm_client_instructions.FLASK_CLIENT_INSTRUCTIONS
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.RAILS,
      instructions: _apm_client_instructions.RAILS_CLIENT_INSTRUCTIONS
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.RACK,
      instructions: _apm_client_instructions.RACK_CLIENT_INSTRUCTIONS
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.JS,
      instructions: _apm_client_instructions.JS_CLIENT_INSTRUCTIONS
    }]
  }]
};
