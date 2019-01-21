'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getTableData = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

let getTableData = exports.getTableData = (() => {
  var _ref = _asyncToGenerator(function* (req, panel) {
    var _req$server$plugins$e = req.server.plugins.elasticsearch.getCluster('data');

    const callWithRequest = _req$server$plugins$e.callWithRequest;

    const params = {
      index: panel.index_pattern,
      body: (0, _build_request_body2.default)(req, panel)
    };
    try {
      const resp = yield callWithRequest(req, 'search', params);
      const buckets = (0, _lodash.get)(resp, 'aggregations.pivot.buckets', []);
      return { type: 'table', series: buckets.map((0, _process_bucket2.default)(panel)) };
    } catch (err) {
      if (err.body) {
        err.response = err.body;
        return _extends({ type: 'table' }, (0, _handle_error_response2.default)(panel)(err));
      }
    }
  });

  return function getTableData(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

var _build_request_body = require('./table/build_request_body');

var _build_request_body2 = _interopRequireDefault(_build_request_body);

var _handle_error_response = require('./handle_error_response');

var _handle_error_response2 = _interopRequireDefault(_handle_error_response);

var _lodash = require('lodash');

var _process_bucket = require('./table/process_bucket');

var _process_bucket2 = _interopRequireDefault(_process_bucket);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }
