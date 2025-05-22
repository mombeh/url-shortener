import request from 'supertest';
import assert from 'assert';
import app from '../app.js';

test('Register, login, and shorten a URL', async () => {
  // Register user
  const email = `test${Date.now()}@example.com`;
  const password = 'test123';
  await request(app)
    .post('/users/register')
    .send({
      firstName: 'Login',
      lastName: 'Test',
      email,
      password
    });
  // Login
  const loginRes = await request(app)
    .post('/users/login')
    .send({ email, password });

  const token = loginRes.body.token;
  expect(token).toBeTruthy()

  // Shorten URL
  const shortenRes = await request(app)
    .post('/api/shorten')
    .set('Authorization', `Bearer ${token}`)
    .send({ longUrl: 'https://example.com' });

  expect(shortenRes.status).toBe(201);
  assert.ok(result.body.short_url);
});
