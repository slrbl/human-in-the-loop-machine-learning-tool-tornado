'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createListStream = createListStream;

var _stream = require('stream');

/**
 *  Create a Readable stream that provides the items
 *  from a list as objects to subscribers
 *
 *  @param  {Array<any>} items - the list of items to provide
 *  @return {Readable}
 */
function createListStream(items = []) {
  const queue = [].concat(items);

  return new _stream.Readable({
    objectMode: true,
    read(size) {
      queue.splice(0, size).forEach(item => {
        this.push(item);
      });

      if (!queue.length) {
        this.push(null);
      }
    }
  });
}
