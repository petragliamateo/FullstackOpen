const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const initialBlogs = require('../utils/initialBlogs');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  // La aplicación se ejecuta en modo de prueba --> La colección de la DB es blogsTest
  await Blog.deleteMany({});
  const blogObject = initialBlogs.map((b) => new Blog(b));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('Get && ID', () => {
  test('HTTP GET test', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('ID of all blogs exist?', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });
});

describe('Post', () => {
  test('HTTP POST test', async () => {
    const newBlog = { title: 'test', url: 'test', likes: 1 };

    await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('api/blogs');
    expect(response.body.length).toHaveLength(initialBlogs.length + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
