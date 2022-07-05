// Rutas
const blogRouter = require('express').Router();
const Blog = require('../models/blog');

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  const result = await blog.save();
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
