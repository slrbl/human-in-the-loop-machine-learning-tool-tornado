'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.confirm = confirm;
exports.question = question;

var _readline = require('readline');

/**
 * @param {String} question
 * @param {Object|null} options
 * @property {Boolean} options.default
 * @property {Stream} options.input - defaults to process.stdin
 * @property {Stream} options.output - defaults to process.stdout
 */

function confirm(question, options = {}) {
  const rl = (0, _readline.createInterface)({
    input: options.input || process.stdin,
    output: options.output || process.stdout
  });

  return new Promise(resolve => {
    const defautValue = options.default ? true : false;
    const defaultPrompt = defautValue ? 'Y/n' : 'y/N';

    rl.question(`${question} [${defaultPrompt}] `, input => {
      let value = defautValue;

      if (input != null && input !== '') {
        value = /^y(es)?/i.test(input);
      }

      rl.close();
      resolve(value);
    });
  });
}

/**
 * @param {String} question
 * @param {Object|null} options
 * @property {Boolean} options.mask
 * @property {Stream} options.input - defaults to process.stdin
 * @property {Stream} options.output - defaults to process.stdout
 */

function question(question, options = {}) {
  const input = options.input || process.stdin;
  const output = options.output || process.stdout;

  const questionPrompt = `${question}: `;
  const rl = (0, _readline.createInterface)({ input, output });

  return new Promise(resolve => {
    input.on('data', char => {
      char = char + '';

      switch (char) {
        case '\n':
        case '\r':
        case '\u0004':
          input.pause();
          break;
        default:
          if (options.mask) {
            output.cursorTo(questionPrompt.length);
            output.write(Array(rl.line.length + 1).join(options.mask || '*'));
          }

          break;
      }
    });

    rl.question(questionPrompt, value => {
      resolve(value);
    });
  });
}
