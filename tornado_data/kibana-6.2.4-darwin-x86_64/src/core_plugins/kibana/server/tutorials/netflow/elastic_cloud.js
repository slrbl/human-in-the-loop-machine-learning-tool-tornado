'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ELASTIC_CLOUD_INSTRUCTIONS = undefined;

var _instruction_variant = require('../../../common/tutorials/instruction_variant');

var _logstash_instructions = require('../../../common/tutorials/logstash_instructions');

var _common_instructions = require('./common_instructions');

// TODO: compare with onPremElasticCloud and onPrem scenarios and extract out common bits
const ELASTIC_CLOUD_INSTRUCTIONS = exports.ELASTIC_CLOUD_INSTRUCTIONS = {
  instructionSets: [{
    title: 'Getting Started',
    instructionVariants: [{
      id: _instruction_variant.INSTRUCTION_VARIANT.OSX,
      instructions: [..._logstash_instructions.LOGSTASH_INSTRUCTIONS.INSTALL.OSX, ..._common_instructions.COMMON_NETFLOW_INSTRUCTIONS.CONFIG.ELASTIC_CLOUD.OSX, ..._common_instructions.COMMON_NETFLOW_INSTRUCTIONS.SETUP.OSX]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.WINDOWS,
      instructions: [..._logstash_instructions.LOGSTASH_INSTRUCTIONS.INSTALL.WINDOWS, ..._common_instructions.COMMON_NETFLOW_INSTRUCTIONS.CONFIG.ELASTIC_CLOUD.WINDOWS, ..._common_instructions.COMMON_NETFLOW_INSTRUCTIONS.SETUP.WINDOWS]
    }]
  }]
};
