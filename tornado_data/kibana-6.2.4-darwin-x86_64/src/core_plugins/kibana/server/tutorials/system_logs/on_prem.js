'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ON_PREM_INSTRUCTIONS = undefined;

var _instruction_variant = require('../../../common/tutorials/instruction_variant');

var _filebeat_instructions = require('../../../common/tutorials/filebeat_instructions');

var _enable = require('./enable');

const ON_PREM_INSTRUCTIONS = exports.ON_PREM_INSTRUCTIONS = {
  instructionSets: [{
    title: 'Getting Started',
    instructionVariants: [{
      id: _instruction_variant.INSTRUCTION_VARIANT.OSX,
      instructions: [_filebeat_instructions.FILEBEAT_INSTRUCTIONS.PLUGINS.GEOIP, _filebeat_instructions.FILEBEAT_INSTRUCTIONS.INSTALL.OSX, _filebeat_instructions.FILEBEAT_INSTRUCTIONS.CONFIG.OSX, _enable.ENABLE_INSTRUCTIONS.OSX, _filebeat_instructions.FILEBEAT_INSTRUCTIONS.START.OSX]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.DEB,
      instructions: [_filebeat_instructions.FILEBEAT_INSTRUCTIONS.PLUGINS.GEOIP, _filebeat_instructions.FILEBEAT_INSTRUCTIONS.INSTALL.DEB, _filebeat_instructions.FILEBEAT_INSTRUCTIONS.CONFIG.DEB, _enable.ENABLE_INSTRUCTIONS.DEB, _filebeat_instructions.FILEBEAT_INSTRUCTIONS.START.DEB]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.RPM,
      instructions: [_filebeat_instructions.FILEBEAT_INSTRUCTIONS.PLUGINS.GEOIP, _filebeat_instructions.FILEBEAT_INSTRUCTIONS.INSTALL.RPM, _filebeat_instructions.FILEBEAT_INSTRUCTIONS.CONFIG.RPM, _enable.ENABLE_INSTRUCTIONS.RPM, _filebeat_instructions.FILEBEAT_INSTRUCTIONS.START.RPM]
    }]
  }]
};
