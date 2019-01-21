'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clientLogger = clientLogger;
function clientLogger(server) {
  return class ElasticsearchClientLogging {
    constructor() {
      this.tags = [];
      this.logQueries = false;
    }
    // additional tags to differentiate connection


    error(err) {
      server.log(['error', 'elasticsearch'].concat(this.tags), err);
    }

    warning(message) {
      server.log(['warning', 'elasticsearch'].concat(this.tags), message);
    }

    trace(method, options, query, _response, statusCode) {
      /* Check if query logging is enabled
       * It requires Kibana to be configured with verbose logging turned on. */
      if (this.logQueries) {
        const methodAndPath = `${method} ${options.path}`;
        const queryDsl = query ? query.trim() : '';
        server.log(['elasticsearch', 'query', 'debug'].concat(this.tags), [statusCode, methodAndPath, queryDsl].join('\n'));
      }
    }

    // elasticsearch-js expects the following functions to exist

    info() {}

    debug() {}

    close() {}
  };
}
