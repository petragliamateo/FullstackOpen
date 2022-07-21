const commentRouter = require('express').Router();
const Blog = require('../models/blog');
const Comment = require('../models/comment');

// Comment post
commentRouter.post('/:id/comment', async (request, response) => {
  const { id } = request.params;
  const { body } = request;
  const blog = await Blog.findById(id);
  const comment = new Comment({
    content: body.content,
    blog: blog._id,
  });
  const savedComment = await comment.save();
  blog.comments = blog.comments.concat(savedComment._id);
  const result = await blog.save();
  response.status(201).json(result);
});

module.exports = commentRouter;
