import assert from 'node:assert/strict';
import test from 'node:test';
import * as api from '../dist/esm/index.js';
test('wire fixture', () => {
  assert.equal(api.encode(new Uint8Array([104, 101, 108, 108, 111])), 'Cn8eVZg');
});
test('decode fixture', () => {
  assert.deepEqual([...api.decode('Cn8eVZg')], [104, 101, 108, 108, 111]);
});
test('byte roundtrips', () => {
  for (let n = 0; n < 100; n++) {
    const v = Uint8Array.from({ length: n }, (_, i) => (i * 37 + n) % 256);
    assert.deepEqual(api.decode(api.encode(v)), v);
  }
});
test('invalid grammar', () => {
  assert.throws(() => api.decode('!'));
});
test('extra convention', () => {
  assert.equal(api.encode(new Uint8Array([0, 0])), '11');
  assert.deepEqual(api.decode('11'), new Uint8Array([0, 0]));
});
test('type contract', () => {
  assert.throws(() => api.encode([]));
  assert.throws(() => api.decode(1));
});
