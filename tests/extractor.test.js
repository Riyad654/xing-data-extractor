onst test = require('node:test');
const assert = require('node:assert');
const { extract } = require('../src/services/extractor');

test('extract() returns profiles for type=profiles', async () => {
  const results = await extract({
    type: 'profiles',
    query: 'engineer',
    limit: 2
  });

  assert.ok(Array.isArray(results), 'results should be an array');
  assert.ok(results.length <= 2, 'results should respect the limit');
  for (const item of results) {
    assert.ok(item.id, 'profile should have id');
    assert.ok(item.name, 'profile should have name');
  }
});

test('extract() throws on invalid type', async () => {
  await assert.rejects(
    () =>
      extract({
        type: 'invalid-type',
        query: 'anything',
        limit: 1
      }),
    /Unsupported type/,
    'should reject invalid types'
  );
});

test('extract() can return jobs', async () => {
  const results = await extract({
    type: 'jobs',
    query: 'Engineer',
    limit: 3
  });

  assert.ok(Array.isArray(results), 'results should be an array');
  assert.ok(results.length <= 3, 'results should respect the limit');
  for (const job of results) {
    assert.ok(job.title, 'job should have title');
    assert.ok(job.company, 'job should have company');
  }
});