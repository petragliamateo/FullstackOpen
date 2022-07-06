const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const initialBlogs = require('../utils/initialBlogs');
const Blog = require('../models/blog');

const api = supertest(app);

beforeEach(async () => {
  // La aplicación se ejecuta en modo de prueba --> La colección de la DB es tests
  await Blog.deleteMany({});
  const blogObject = initialBlogs.map((b) => new Blog(b));
  const promiseArray = blogObject.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('HTTP Request', () => {
  test('GET test', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/);
    expect(response.body).toHaveLength(initialBlogs.length);
  });

  test('POST test', async () => {
    const newBlog = {
      title: 'test', url: 'test', author: 'test', likes: 1,
    };

    await api.post('/api/blogs').send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/);

    const response = await api.get('/api/blogs');
    expect(response.body).toHaveLength(initialBlogs.length + 1);
  });

  test('Delete test', async () => {
    const blogs = await api.get('/api/blogs');
    const randomIndex = Math.floor(Math.random() * blogs.body.length);
    const randomBlog = blogs.body[randomIndex];

    await api.delete(`/api/blogs/${randomBlog.id}`)
      .expect(204);

    const finalBlogs = await api.get('/api/blogs');
    expect(finalBlogs.body).toHaveLength(blogs.body.length - 1);
    expect(finalBlogs.body).not.toContain(randomBlog);
  });

  test('PUT test', async () => {
    const blogs = await api.get('/api/blogs');
    const randomIndex = Math.floor(Math.random() * blogs.body.length);
    const randomBlog = blogs.body[randomIndex];
    const updateBlog = { ...randomBlog, title: 'updated', author: 'updated' };

    await api.put(`/api/blogs/${randomBlog.id}`).send(updateBlog)
      .expect(200);

    const finalBlogs = await api.get('/api/blogs');
    expect(finalBlogs.body[randomIndex].title).toBe('updated');
    expect(finalBlogs.body[randomIndex].author).toBe('updated');
  });
});

describe('Object props', () => {
  test('ID of all blogs exist?', async () => {
    const response = await api.get('/api/blogs');
    response.body.forEach((blog) => {
      expect(blog.id).toBeDefined();
    });
  });

  test('if dont have likes prop, then is zero', async () => {
    const blogWithoutLikes = { title: 'test', url: 'test', author: 'test' };
    const result = await api.post('/api/blogs').send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type', /application\/json/);
    expect(result.body.likes).toBe(0);
  });

  test('if dont have title and url props, then state is 400', async () => {
    const blogIncompleted = { author: 'test', likes: 0 };
    await api.post('/api/blogs').send(blogIncompleted)
      .expect(400);
  });

  test('like blog test', async () => {
    const blogs = await api.get('/api/blogs');
    const randomIndex = Math.floor(Math.random() * blogs.body.length);
    const randomBlog = blogs.body[randomIndex];
    const updateBlog = { ...randomBlog, likes: randomBlog.likes + 1 };

    await api.put(`/api/blogs/${randomBlog.id}`).send(updateBlog)
      .expect(200);

    const finalBlogs = await api.get('/api/blogs');
    expect(finalBlogs.body[randomIndex].likes).toBe(randomBlog.likes + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
