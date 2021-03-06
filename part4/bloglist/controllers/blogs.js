// Rutas
const blogRouter = require('express').Router();
const jwt = require('jsonwebtoken');
const Blog = require('../models/blog');
const User = require('../models/user');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
    .populate('comments', { content: 1 });
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  // Validación token:
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  }
  // Cargo user y posteo
  const user = await User.findById(decodedToken.id);
  const { body } = request;
  const blog = new Blog({
    ...body, user: user._id,
  });
  const result = await blog.save();
  user.blogs = user.blogs ? user.blogs.concat(result._id) : [result._id];
  await user.save();
  response.status(201).json(result);
});

blogRouter.delete('/:id', async (request, response) => {
  // Validación token:
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    response.status(401).json({ error: 'token missing or invalid' });
  }

  const user = await User.findById(decodedToken.id);
  const isFromUser = user.blogs.includes(request.params.id);
  if (!isFromUser) {
    response.status(401).json({ error: 'the blog is from other user' });
  }
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
