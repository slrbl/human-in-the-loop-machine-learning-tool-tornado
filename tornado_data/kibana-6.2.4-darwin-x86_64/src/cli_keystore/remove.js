'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

let remove = exports.remove = (() => {
  var _ref = _asyncToGenerator(function* (keystore, key) {
    keystore.remove(key);
    keystore.save();
  });

  return function remove(_x, _x2) {
    return _ref.apply(this, arguments);
  };
})();

exports.removeCli = removeCli;

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function removeCli(program, keystore) {
  program.command('remove <key>').description('Remove a setting from the keystore').option('-s, --silent', 'prevent all logging').action(remove.bind(null, keystore));
}
