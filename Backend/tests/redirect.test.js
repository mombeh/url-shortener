import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../app.js';

let shortCode;

test('Create short URL to test redirect', async () => {
  const email = `redirect${Date.now()}@example.com`;
  const password = 'StrongP@ssw0rd!';

  await request(app).post('/register').send({
    firstName: 'Redirect',
    lastName: 'Test',
    email,
    password,
  });

  const loginRes = await request(app).post('/login').send({ email, password });
  const token = loginRes.body.token;

  const shortenRes = await request(app)
    .post('/api/shorten')
    .set('Authorization', `Bearer ${token}`)
    .send({ longUrl: 'https://nodejs.org' });
});

test('GET /redirect/:shortCode - should redirect to original URL', async () => {
  const res = await request(app).get(`/redirect/${shortCode}`).redirects(0);

});
