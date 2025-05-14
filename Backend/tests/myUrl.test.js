import test from 'node:test';
import assert from 'node:assert';
import request from 'supertest';
import app from '../app.js';

let token;

test('Setup and shorten a URL', async () => {
  const email = `myurl${Date.now()}@example.com`;
  const password = 'StrongP@ssw0rd!';

  await request(app).post('/register').send({
    firstName: 'MyURL',
    lastName: 'Test',
    email,
    password,
  });

  const loginRes = await request(app).post('/login').send({ email, password });
  token = loginRes.body.token;

  await request(app)
    .post('/api/shorten')
    .set('Authorization', `Bearer ${token}`)
    .send({ longUrl: 'https://my.test.url' });

});

test('GET /myurls - should return list of URLs for user', async () => {
  const res = await request(app)
    .get('/myurls')
    .set('Authorization', `Bearer ${token}`);

});
