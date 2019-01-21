'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shouldReadFieldFromDocValues = shouldReadFieldFromDocValues;
function shouldReadFieldFromDocValues(aggregatable, esType) {
  return aggregatable && esType !== 'text' && !esType.startsWith('_');
}
