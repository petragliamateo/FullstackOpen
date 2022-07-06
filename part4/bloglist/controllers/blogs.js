/* eslint-disable no-underscore-dangle */
// Rutas
const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const { body } = request;
  const users = await User.find();
  const user = users[0];
  const blog = new Blog({
    ...body, user: user._id,
  });
  const result = await blog.save();
  user.blogs = user.blogs ? user.blogs.concat(result._id) : [result._id];
  await user.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id);
  response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
  const {
    title, author, url, likes,
  } = request.body;
  const updateBlog = {
    title,
    author,
    url,
    likes,
    id: request.params.id,
  };
  const options = { new: true, runValidators: true };
  const result = await Blog.findByIdAndUpdate(request.params.id, updateBlog, options);
  response.json(result);
});

module.exports = blogRouter;
