'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexPatternsMixin = indexPatternsMixin;

var _service = require('./service');

var _routes = require('./routes');

function indexPatternsMixin(kbnServer, server) {
  const pre = {
    /**
    *  Create an instance of the `indexPatterns` service
    *  @type {Hapi.Pre}
    */
    getIndexPatternsService: {
      assign: 'indexPatterns',
      method(request, reply) {
        reply(request.getIndexPatternsService());
      }
    }
  };

  /**
   *  Create an instance of the IndexPatternsService
   *
   *  @method server.indexPatternsServiceFactory
   *  @type {IndexPatternsService}
   */
  server.decorate('server', 'indexPatternsServiceFactory', ({ callCluster }) => {
    return new _service.IndexPatternsService(callCluster);
  });

  /**
   *  Get an instance of the IndexPatternsService configured for use
   *  the current request
   *
   *  @method request.getIndexPatternsService
   *  @type {IndexPatternsService}
   */
  server.addMemoizedFactoryToRequest('getIndexPatternsService', request => {
    var _request$server$plugi = request.server.plugins.elasticsearch.getCluster('data');

    const callWithRequest = _request$server$plugi.callWithRequest;

    const callCluster = (...args) => callWithRequest(request, ...args);
    return server.indexPatternsServiceFactory({ callCluster });
  });

  server.route((0, _routes.createFieldsForWildcardRoute)(pre));
  server.route((0, _routes.createFieldsForTimePatternRoute)(pre));
}
