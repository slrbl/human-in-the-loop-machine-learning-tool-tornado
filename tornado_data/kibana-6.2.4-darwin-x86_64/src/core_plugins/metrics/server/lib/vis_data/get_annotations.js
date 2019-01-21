'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _build_annotation_request = require('./build_annotation_request');

var _build_annotation_request2 = _interopRequireDefault(_build_annotation_request);

var _handle_annotation_response = require('./handle_annotation_response');

var _handle_annotation_response2 = _interopRequireDefault(_handle_annotation_response);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function validAnnotation(annotation) {
  return annotation.index_pattern && annotation.time_field && annotation.fields && annotation.icon && annotation.template;
}

exports.default = (() => {
  var _ref = _asyncToGenerator(function* (req, panel) {
    var _req$server$plugins$e = req.server.plugins.elasticsearch.getCluster('data');

    const callWithRequest = _req$server$plugins$e.callWithRequest;

    const bodies = panel.annotations.filter(validAnnotation).map(function (annotation) {

      const indexPattern = annotation.index_pattern;
      const bodies = [];

      bodies.push({
        index: indexPattern,
        ignore: [404],
        timeout: '90s',
        requestTimeout: 90000,
        ignoreUnavailable: true
      });

      bodies.push((0, _build_annotation_request2.default)(req, panel, annotation));
      return bodies;
    });

    if (!bodies.length) return { responses: [] };
    try {
      const resp = yield callWithRequest(req, 'msearch', {
        body: bodies.reduce(function (acc, item) {
          return acc.concat(item);
        }, [])
      });
      const results = {};
      panel.annotations.filter(validAnnotation).forEach(function (annotation, index) {
        const data = resp.responses[index];
        results[annotation.id] = (0, _handle_annotation_response2.default)(data, annotation);
      });
      return results;
    } catch (error) {
      if (error.message === 'missing-indices') return { responses: [] };
      throw error;
    }
  });

  return function (_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

module.exports = exports['default'];
