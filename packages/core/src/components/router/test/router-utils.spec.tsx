import { RouterSegments, parseURL } from '../';

describe('RouterSegments', () => {
  it ('should initialize with empty array', () => {
    const s = new RouterSegments([]);
    expect(s.next()).toEqual('');
    expect(s.next()).toEqual('');
    expect(s.next()).toEqual('');
    expect(s.next()).toEqual('');
    expect(s.next()).toEqual('');
  });

  it ('should initialize with array', () => {
    const s = new RouterSegments(['', 'path', 'to', 'destination']);
    expect(s.next()).toEqual('');
    expect(s.next()).toEqual('path');
    expect(s.next()).toEqual('to');
    expect(s.next()).toEqual('destination');
    expect(s.next()).toEqual('');
    expect(s.next()).toEqual('');
  });
});

describe('parseURL', () => {
  it('should parse empty path', () => {
    expect(parseURL('')).toEqual(['']);
  });

  it('should parse empty path (2)', () => {
    expect(parseURL('   ')).toEqual(['']);
  });

  it('should parse null path', () => {
    expect(parseURL(null)).toEqual(['']);
  });

  it('should parse undefined path', () => {
    expect(parseURL(undefined)).toEqual(['']);
  });

});
