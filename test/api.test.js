const { test } = require('node:test');
const assert = require('node:assert/strict');
const { once } = require('node:events');
const app = require('../server');

test('generated records preserve count, fields and CORS', async (t) => {
  const server = app.listen(0, '127.0.0.1');
  t.after(() => new Promise((resolve) => server.close(resolve)));
  await once(server, 'listening');
  const base = `http://127.0.0.1:${server.address().port}`;
  for (const [count, expected] of [['3', 3], ['0', 0], ['-2', 2]]) {
    const response = await fetch(`${base}/api/${count}`);
    assert.equal(response.status, 200);
    assert.equal(response.headers.get('access-control-allow-origin'), '*');
    const records = await response.json();
    assert.equal(records.length, expected);
    records.forEach((record, index) => {
      assert.deepEqual(Object.keys(record).sort(), ['email', 'gender', 'id', 'mobile', 'name']);
      assert.equal(record.id, Number(count) < 0 && index > 0 ? -index : index);
      assert.ok(['Male', 'Female'].includes(record.gender));
      for (const field of ['name', 'mobile', 'email']) assert.ok(record[field].length > 0);
      assert.ok(record.email.includes('@'));
    });
  }
});
