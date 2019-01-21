'use strict';

var _html_id_generator = require('./html_id_generator');

describe('htmlIdGenerator', () => {

  it('should return a function', () => {
    const fn = (0, _html_id_generator.htmlIdGenerator)();
    expect(typeof fn).toBe('function');
  });

  it('should return an id ending with the specified suffix', () => {
    expect((0, _html_id_generator.htmlIdGenerator)()('suf')).toMatch(/suf$/);
  });

  it('should return an id beginning with the specified prefix', () => {
    expect((0, _html_id_generator.htmlIdGenerator)('pref')('foo')).toMatch(/^pref/);
  });

  it('should create the same id for the same suffix', () => {
    const idGenerator = (0, _html_id_generator.htmlIdGenerator)();
    expect(idGenerator('foo')).toBe(idGenerator('foo'));
  });

  it('should create different ids for different suffixes', () => {
    const idGenerator = (0, _html_id_generator.htmlIdGenerator)();
    expect(idGenerator('foo')).not.toBe(idGenerator('bar'));
  });

  it('should generate different ids on different instances', () => {
    const idGenerator1 = (0, _html_id_generator.htmlIdGenerator)();
    const idGenerator2 = (0, _html_id_generator.htmlIdGenerator)();
    expect(idGenerator1('foo')).not.toBe(idGenerator2('foo'));
  });

  it('should generate different ids if no suffix is passed', () => {
    const generator = (0, _html_id_generator.htmlIdGenerator)();
    expect(generator()).not.toBe(generator());
  });
});
