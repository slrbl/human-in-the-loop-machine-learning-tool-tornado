'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Metrics = undefined;

var _lodash = require('lodash');

var _case_conversion = require('../../utils/case_conversion');

var _cgroup = require('./cgroup');

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Metrics {
  constructor(config, server) {
    this.config = config;
    this.server = server;
    this.checkCGroupStats = true;
  }

  capture(hapiEvent) {
    var _this = this;

    return _asyncToGenerator(function* () {
      const timestamp = new Date().toISOString();
      const event = _this.captureEvent(hapiEvent);
      const cgroup = yield _this.captureCGroupsIfAvailable();

      const metrics = {
        last_updated: timestamp,
        collection_interval_in_millis: _this.config.get('ops.interval'),
        uptime_in_millis: process.uptime() * 1000
      };

      return (0, _lodash.merge)(metrics, event, cgroup);
    })();
  }

  captureEvent(hapiEvent) {
    const port = this.config.get('server.port');

    return {
      process: {
        mem: {
          heap_max_in_bytes: (0, _lodash.get)(hapiEvent, 'psmem.heapTotal'),
          heap_used_in_bytes: (0, _lodash.get)(hapiEvent, 'psmem.heapUsed')
        }
      },
      os: {
        cpu: {
          load_average: {
            '1m': (0, _lodash.get)(hapiEvent, 'osload.0'),
            '5m': (0, _lodash.get)(hapiEvent, 'osload.1'),
            '15m': (0, _lodash.get)(hapiEvent, 'osload.2')
          }
        }
      },
      response_times: {
        avg_in_millis: (0, _lodash.get)(hapiEvent, ['responseTimes', port, 'avg']),
        max_in_millis: (0, _lodash.get)(hapiEvent, ['responseTimes', port, 'max'])
      },
      requests: (0, _case_conversion.keysToSnakeCaseShallow)((0, _lodash.get)(hapiEvent, ['requests', port])),
      concurrent_connections: (0, _lodash.get)(hapiEvent, ['concurrents', port])
    };
  }

  captureCGroups() {
    var _this2 = this;

    return _asyncToGenerator(function* () {
      try {
        const cgroup = yield (0, _cgroup.getAllStats)({
          cpuPath: _this2.config.get('cpu.cgroup.path.override'),
          cpuAcctPath: _this2.config.get('cpuacct.cgroup.path.override')
        });

        if ((0, _lodash.isObject)(cgroup)) {
          return {
            os: {
              cgroup
            }
          };
        }
      } catch (e) {
        _this2.server.log(['error', 'metrics', 'cgroup'], e);
      }
    })();
  }

  captureCGroupsIfAvailable() {
    var _this3 = this;

    return _asyncToGenerator(function* () {
      if (_this3.checkCGroupStats === true) {
        const cgroup = yield _this3.captureCGroups();

        if ((0, _lodash.isObject)(cgroup)) {
          return cgroup;
        }

        _this3.checkCGroupStats = false;
      }
    })();
  }
}
exports.Metrics = Metrics;
