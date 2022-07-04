const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');

const api = supertest(app);

test('HTTP GET test', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);
  expect(response.body).toHaveLength(8);
});

afterAll(() => {
  mongoose.connection.close();
});
