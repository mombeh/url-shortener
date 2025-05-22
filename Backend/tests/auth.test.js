// tests/auth.test.js
import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../app.js'; // adjust if needed based on your project structure

test('POST /users/register - should register a new user', async () => {
  const res = await request(app)
    .post('/users/register')
    .send({
      firstName: 'Lign',
      lastName: 'Test',
      email: `login${Date.now()}@example.com`,
      password: 'test123',
    });

});

test('POST /users/login - should return a token for valid credentials', async () => {
  const email = `login${Date.now()}@example.com`;
  const password = 'StrongP@ssw0rd!';

  // First register the user
  await request(app).post('/users/register').send({
    firstName: 'Login',
    lastName: 'Test',
    email,
    password,
  });

  // Then login
  const res = await request(app)
    .post('/users/login')
    .send({ email, password });

  assert.strictEqual(res.statusCode, 200);
  assert.ok(res.body.token);
});
