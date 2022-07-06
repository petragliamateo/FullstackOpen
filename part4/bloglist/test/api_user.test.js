const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const User = require('../models/user');

const api = supertest(app);

beforeEach(async () => {
  // La aplicación se ejecuta en modo de prueba --> La colección de la DB es tests
  await User.deleteMany({});
  const initUser = new User({
    username: 'root',
    name: 'First User',
    password: '123456',
  });
  await initUser.save();
});

describe('Initial test', () => {
  test('GET test', async () => {
    const response = await api.get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(1);
  });

  test('POST test', async () => {
    const newUser = {
      username: 'test', name: 'test', password: 'test',
    };
    await api.post('/api/users').send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(2);
  });

  test('POST invalid username', async () => {
    const newUser = {
      username: 'te', name: 'test', password: 'test',
    };
    await api.post('/api/users').send(newUser)
      .expect(400);
  });

  test('POST invalid password', async () => {
    const newUser = {
      username: 'test', name: 'test', password: 'te',
    };
    await api.post('/api/users').send(newUser)
      .expect(400);
  });

  test('POST existing username', async () => {
    const newUser = {
      username: 'root', name: 'test', password: 'te',
    };
    await api.post('/api/users').send(newUser)
      .expect(400);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
