'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.savedObjectsMixin = savedObjectsMixin;

var _client = require('./client');

var _routes = require('./routes');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function savedObjectsMixin(kbnServer, server) {
  let onBeforeWrite = (() => {
    var _ref = _asyncToGenerator(function* () {
      const adminCluster = server.plugins.elasticsearch.getCluster('admin');

      try {
        const index = server.config().get('kibana.index');
        yield adminCluster.callWithInternalUser('indices.putTemplate', {
          name: `kibana_index_template:${index}`,
          body: {
            template: index,
            settings: {
              number_of_shards: 1,
              auto_expand_replicas: '0-1'
            },
            mappings: server.getKibanaIndexMappingsDsl()
          }
        });
      } catch (error) {
        server.log(['debug', 'savedObjects'], {
          tmpl: 'Attempt to write indexTemplate for SavedObjects index failed: <%= err.message %>',
          es: {
            resp: error.body,
            status: error.status
          },
          err: {
            message: error.message,
            stack: error.stack
          }
        });

        // We reject with `es.ServiceUnavailable` because writing an index
        // template is a very simple operation so if we get an error here
        // then something must be very broken
        throw new adminCluster.errors.ServiceUnavailable();
      }
    });

    return function onBeforeWrite() {
      return _ref.apply(this, arguments);
    };
  })();

  const prereqs = {
    getSavedObjectsClient: {
      assign: 'savedObjectsClient',
      method(req, reply) {
        reply(req.getSavedObjectsClient());
      }
    }
  };

  server.route((0, _routes.createBulkGetRoute)(prereqs));
  server.route((0, _routes.createCreateRoute)(prereqs));
  server.route((0, _routes.createDeleteRoute)(prereqs));
  server.route((0, _routes.createFindRoute)(prereqs));
  server.route((0, _routes.createGetRoute)(prereqs));
  server.route((0, _routes.createUpdateRoute)(prereqs));

  server.decorate('server', 'savedObjectsClientFactory', ({ callCluster }) => {
    return new _client.SavedObjectsClient({
      index: server.config().get('kibana.index'),
      mappings: server.getKibanaIndexMappingsDsl(),
      callCluster,
      onBeforeWrite
    });
  });

  const savedObjectsClientCache = new WeakMap();
  server.decorate('request', 'getSavedObjectsClient', function () {
    const request = this;

    if (savedObjectsClientCache.has(request)) {
      return savedObjectsClientCache.get(request);
    }

    var _server$plugins$elast = server.plugins.elasticsearch.getCluster('admin');

    const callWithRequest = _server$plugins$elast.callWithRequest;

    const callCluster = (...args) => callWithRequest(request, ...args);
    const savedObjectsClient = server.savedObjectsClientFactory({ callCluster });

    savedObjectsClientCache.set(request, savedObjectsClient);
    return savedObjectsClient;
  });
}
