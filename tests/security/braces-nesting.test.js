'use strict';

const assert = require('node:assert/strict');
const test = require('node:test');
const braces = require('braces');

const MAX_NESTING = 100;

test('supports ordinary brace expansion and ranges', () => {
  assert.deepEqual(braces('{alpha,beta}'), ['(alpha|beta)']);
  assert.deepEqual(braces.expand('{1..3}'), ['1', '2', '3']);
});

test('bounds deeply nested brace patterns before recursive processing', () => {
  const allowed = '{'.repeat(MAX_NESTING) + 'a,b' + '}'.repeat(MAX_NESTING);
  const rejected = '{'.repeat(MAX_NESTING + 1) + 'a,b' + '}'.repeat(MAX_NESTING + 1);

  assert.doesNotThrow(() => braces.compile(allowed));
  assert.throws(() => braces.compile(rejected), {
    name: 'SyntaxError',
    message: `Input nesting exceeds max depth (${MAX_NESTING})`,
  });
  assert.throws(() => braces.expand(rejected), {
    name: 'SyntaxError',
    message: `Input nesting exceeds max depth (${MAX_NESTING})`,
  });
});

test('bounds deeply nested parenthesized patterns', () => {
  const rejected = '('.repeat(MAX_NESTING + 1) + 'x' + ')'.repeat(MAX_NESTING + 1);

  assert.throws(() => braces.compile(rejected), {
    name: 'SyntaxError',
    message: `Input nesting exceeds max depth (${MAX_NESTING})`,
  });
});
