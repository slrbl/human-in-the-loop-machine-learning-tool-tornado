'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = alter;

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* @param {Array} args
 * - args[0] must be a seriesList

 * @params {Function} fn - Function to apply to each series in the seriesList
 * @return {seriesList}
 */

function alter(args, fn) {
  // In theory none of the args should ever be promises. This is probably a waste.
  return _bluebird2.default.all(args).then(function (args) {

    const seriesList = args.shift();

    if (seriesList.type !== 'seriesList') {
      throw new Error('args[0] must be a seriesList');
    }

    const list = _lodash2.default.chain(seriesList.list).map(function (series) {
      return fn.apply(this, [series].concat(args));
    }).flatten().value();

    seriesList.list = list;
    return seriesList;
  }).catch(function (e) {
    throw e;
  });
}
module.exports = exports['default'];
