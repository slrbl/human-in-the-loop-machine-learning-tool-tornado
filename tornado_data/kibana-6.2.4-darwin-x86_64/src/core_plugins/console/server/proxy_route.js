'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createProxyRoute = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _wreck = require('wreck');

var _wreck2 = _interopRequireDefault(_wreck);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function resolveUri(base, path) {
  return `${(0, _lodash.trimRight)(base, '/')}/${(0, _lodash.trimLeft)(path, '/')}`;
}

function extendCommaList(obj, property, value) {
  obj[property] = (obj[property] ? obj[property] + ',' : '') + value;
}

function getProxyHeaders(req) {
  const headers = {};

  if (req.info.remotePort && req.info.remoteAddress) {
    // see https://git.io/vytQ7
    extendCommaList(headers, 'x-forwarded-for', req.info.remoteAddress);
    extendCommaList(headers, 'x-forwarded-port', req.info.remotePort);
    extendCommaList(headers, 'x-forwarded-proto', req.connection.info.protocol);
    extendCommaList(headers, 'x-forwarded-host', req.info.host);
  }

  const contentType = req.headers['content-type'];
  if (contentType) {
    headers['content-type'] = contentType;
  }

  return headers;
}

const createProxyRoute = exports.createProxyRoute = ({
  baseUrl = '/',
  pathFilters = [/.*/],
  getConfigForReq = () => ({})
}) => ({
  path: '/api/console/proxy',
  method: 'POST',
  config: {
    payload: {
      output: 'stream',
      parse: false
    },

    validate: {
      query: _joi2.default.object().keys({
        method: _joi2.default.string().valid('HEAD', 'GET', 'POST', 'PUT', 'DELETE').insensitive().required(),
        path: _joi2.default.string().required()
      }).unknown(true)
    },

    pre: [function filterPath(req, reply) {
      const path = req.query.path;


      if (!pathFilters.some(re => re.test(path))) {
        const err = _boom2.default.forbidden();
        err.output.payload = `Error connecting to '${path}':\n\nUnable to send requests to that path.`;
        err.output.headers['content-type'] = 'text/plain';
        reply(err);
      } else {
        reply();
      }
    }],

    handler(req, reply) {
      const payload = req.payload,
            query = req.query;
      const path = query.path,
            method = query.method;

      const uri = resolveUri(baseUrl, path);

      var _getConfigForReq = getConfigForReq(req, uri);

      const timeout = _getConfigForReq.timeout,
            rejectUnauthorized = _getConfigForReq.rejectUnauthorized,
            agent = _getConfigForReq.agent,
            headers = _getConfigForReq.headers;


      const wreckOptions = {
        payload,
        timeout,
        rejectUnauthorized,
        agent,
        headers: _extends({}, headers, getProxyHeaders(req))
      };

      _wreck2.default.request(method, uri, wreckOptions, (err, esResponse) => {
        if (err) {
          return reply(err);
        }

        if (method.toUpperCase() !== 'HEAD') {
          reply(esResponse).code(esResponse.statusCode).header('warning', esResponse.headers.warning);
          return;
        }

        reply(`${esResponse.statusCode} - ${esResponse.statusMessage}`).code(esResponse.statusCode).type('text/plain').header('warning', esResponse.headers.warning);
      });
    }
  }
});
