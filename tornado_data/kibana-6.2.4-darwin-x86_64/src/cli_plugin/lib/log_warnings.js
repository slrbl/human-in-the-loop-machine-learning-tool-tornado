'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (settings, logger) {
  process.on('warning', warning => {
    logger.error(warning);
  });
};

module.exports = exports['default'];
