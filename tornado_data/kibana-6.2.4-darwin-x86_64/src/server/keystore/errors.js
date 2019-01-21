'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
class KeystoreError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class UnableToReadKeystore extends KeystoreError {
  constructor(message) {
    super(message || 'unable to read keystore');
  }
}
exports.UnableToReadKeystore = UnableToReadKeystore;
