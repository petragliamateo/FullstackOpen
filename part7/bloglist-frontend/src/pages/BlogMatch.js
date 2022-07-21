/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/prop-types */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import blogService from '../services/blogs';
import { setItem } from '../reducer/appReducer';

function BlogMatch({ blog }) {
  const blogs = useSelector((st) => st.blogs);
  const dispatch = useDispatch();

  const handleLike = async () => {
    const likedBlog = {
      ...blog, likes: blog.likes + 1,
    };
    await blogService.putBlog(likedBlog);
    const newBlogs = [...blogs];
    newBlogs[newBlogs.indexOf(blog)] = likedBlog;
    newBlogs.sort((a, b) => b.likes - a.likes);
    dispatch(setItem('blogs', newBlogs));
  };

  if (!blog) {
    return null;
  }
  return (
    <div>
      <h2>{blog.title}</h2>
      <p>{blog.url}</p>
      <p>{blog.likes} likes <button type="submit" onClick={handleLike}>Like</button></p>
      <p>added by {blog.author}</p>
      <h3>comments</h3>
      <ul>
        {blog.comments.map((c) => (
          <li key={c.id}>{c.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default BlogMatch;
