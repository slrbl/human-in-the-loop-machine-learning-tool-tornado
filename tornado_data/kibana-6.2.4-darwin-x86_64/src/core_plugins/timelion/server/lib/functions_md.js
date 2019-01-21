'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _load_functions = require('./load_functions.js');

var _load_functions2 = _interopRequireDefault(_load_functions);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const functions = (0, _load_functions2.default)('series_functions/');

exports.default = function () {
  const functionArray = _lodash2.default.map(functions, function (val, key) {
    // TODO: This won't work on frozen objects, it should be removed when everything is converted to datasources and chainables
    return _lodash2.default.extend({}, val, { name: key });
  });

  function toDocBlock(fn) {
    let help = '';

    if (fn.isAlias) return help;

    help += '#### .' + fn.name + '()\n';
    help += fn.help + '\n\n';

    // If chainable, drop first argument from help
    const args = fn.chainable ? fn.args.slice(1) : fn.args.slice();
    if (!args.length) {
      help += '*This function does not accept any arguments.*\n\n';
      return help;
    }

    help += 'Argument | Accepts | Description\n';
    help += '--- | --- | ---\n';

    _lodash2.default.each(args, function (arg) {
      help += arg.name + ' | *' + _lodash2.default.without(arg.types, 'null').join('/') + '* | ';
      help += arg.help ? arg.help : '*no help available*';
      help += '  \n';
    });

    help += '\n';

    return help;
  }

  function createDocs() {
    let help = '';
    help += '## Timelion function reference\n';
    help += 'This document is auto generated from the timelion code. ' + 'Do not submit pulls against this document. You want to submit a pull against something in the ' + '`series_functions/` directory.\n\n';

    help += '### Data sources\n';
    help += 'Data sources can start a chain, they don\'t need to be attached to anything, but they still need to start' + ' with a `.` (dot). Data retreived from a data source can be passed into the chainable functions in the next section.\n\n';

    help += _lodash2.default.chain(functionArray).filter('datasource').map(toDocBlock).value().join('');

    help += '### Chainable functions\n';
    help += 'Chainable functions can not start a chain. Somewhere before them must be a data source function. Chainable' + ' functions modify the data output directly from a data source, or from another chainable function that has a data' + ' source somewhere before it.\n\n';

    help += _lodash2.default.chain(functionArray).filter('chainable').map(toDocBlock).value().join('');

    return help;
  }

  return createDocs();
}();

module.exports = exports['default'];
