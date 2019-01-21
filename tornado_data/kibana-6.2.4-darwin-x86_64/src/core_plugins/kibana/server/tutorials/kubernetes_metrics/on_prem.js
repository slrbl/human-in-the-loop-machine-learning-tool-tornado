'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ON_PREM_INSTRUCTIONS = undefined;

var _instruction_variant = require('../../../common/tutorials/instruction_variant');

var _metricbeat_instructions = require('../../../common/tutorials/metricbeat_instructions');

var _enable = require('./enable');

const ON_PREM_INSTRUCTIONS = exports.ON_PREM_INSTRUCTIONS = {
  instructionSets: [{
    title: 'Getting Started',
    instructionVariants: [{
      id: _instruction_variant.INSTRUCTION_VARIANT.OSX,
      instructions: [_metricbeat_instructions.METRICBEAT_INSTRUCTIONS.INSTALL.OSX, _metricbeat_instructions.METRICBEAT_INSTRUCTIONS.CONFIG.OSX, _enable.ENABLE_INSTRUCTIONS.OSX, _metricbeat_instructions.METRICBEAT_INSTRUCTIONS.START.OSX]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.DEB,
      instructions: [_metricbeat_instructions.METRICBEAT_INSTRUCTIONS.INSTALL.DEB, _metricbeat_instructions.METRICBEAT_INSTRUCTIONS.CONFIG.DEB, _enable.ENABLE_INSTRUCTIONS.DEB, _metricbeat_instructions.METRICBEAT_INSTRUCTIONS.START.DEB]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.RPM,
      instructions: [_metricbeat_instructions.METRICBEAT_INSTRUCTIONS.INSTALL.RPM, _metricbeat_instructions.METRICBEAT_INSTRUCTIONS.CONFIG.RPM, _enable.ENABLE_INSTRUCTIONS.RPM, _metricbeat_instructions.METRICBEAT_INSTRUCTIONS.START.RPM]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.WINDOWS,
      instructions: [_metricbeat_instructions.METRICBEAT_INSTRUCTIONS.INSTALL.WINDOWS, _metricbeat_instructions.METRICBEAT_INSTRUCTIONS.CONFIG.WINDOWS, _enable.ENABLE_INSTRUCTIONS.WINDOWS, _metricbeat_instructions.METRICBEAT_INSTRUCTIONS.START.WINDOWS]
    }]
  }]
};
