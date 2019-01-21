'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialSchema = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _param_types = require('./param_types');

var _tutorial_category = require('./tutorial_category');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const dashboardSchema = _joi2.default.object({
  id: _joi2.default.string().required(), // Dashboard saved object id
  linkLabel: _joi2.default.string().when('isOverview', {
    is: true,
    then: _joi2.default.required()
  }),
  // Is this an Overview / Entry Point dashboard?
  isOverview: _joi2.default.boolean().required()
});

const artifactsSchema = _joi2.default.object({
  // Fields present in Elasticsearch documents created by this product.
  exportedFields: _joi2.default.object({
    documentationUrl: _joi2.default.string().required()
  }),
  // Kibana dashboards created by this product.
  dashboards: _joi2.default.array().items(dashboardSchema).required()
});

const instructionSchema = _joi2.default.object({
  title: _joi2.default.string(),
  textPre: _joi2.default.string(),
  commands: _joi2.default.array().items(_joi2.default.string()),
  textPost: _joi2.default.string()
});

const instructionVariantSchema = _joi2.default.object({
  id: _joi2.default.string().required(),
  instructions: _joi2.default.array().items(instructionSchema).required()
});

const instructionSetSchema = _joi2.default.object({
  title: _joi2.default.string(),
  // Variants (OSes, languages, etc.) for which tutorial instructions are specified.
  instructionVariants: _joi2.default.array().items(instructionVariantSchema).required()
});

const paramSchema = _joi2.default.object({
  defaultValue: _joi2.default.required(),
  id: _joi2.default.string().regex(/^[a-zA-Z_]+$/).required(),
  label: _joi2.default.string().required(),
  type: _joi2.default.string().valid(Object.values(_param_types.PARAM_TYPES)).required()
});

const instructionsSchema = _joi2.default.object({
  instructionSets: _joi2.default.array().items(instructionSetSchema).required(),
  params: _joi2.default.array().items(paramSchema)
});

const tutorialSchema = exports.tutorialSchema = {
  id: _joi2.default.string().regex(/^[a-zA-Z0-9-]+$/).required(),
  category: _joi2.default.string().valid(Object.values(_tutorial_category.TUTORIAL_CATEGORY)).required(),
  name: _joi2.default.string().required(),
  shortDescription: _joi2.default.string().required(),
  iconPath: _joi2.default.string(),
  longDescription: _joi2.default.string().required(),
  completionTimeMinutes: _joi2.default.number().integer(),
  previewImagePath: _joi2.default.string(),

  // kibana and elastic cluster running on prem
  onPrem: instructionsSchema.required(),

  // kibana and elastic cluster running in elastic's cloud
  elasticCloud: instructionsSchema,

  // kibana running on prem and elastic cluster running in elastic's cloud
  onPremElasticCloud: instructionsSchema,

  // Elastic stack artifacts produced by product when it is setup and run.
  artifacts: artifactsSchema
};
