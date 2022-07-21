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

  const addComment = async (event) => {
    event.preventDefault();
    const { comment } = event.target;
    await blogService.postCommentBlog(blog.id, comment.value);
    const refreshBlogs = await blogService.getAll();
    dispatch(setItem('blogs', refreshBlogs));
    comment.value = '';
  };

  if (!blog) {
    return null;
  }
  return (
    <div className="flex flex-col items-center w-full my-10">
      <h2 className="text-2xl font-semibold mb-5">{blog.title}</h2>
      <a href={blog.url} className="text-blue-800 font-bold">{blog.url}</a>
      <p className="font-semibold">{blog.likes} likes
        <button
          type="submit"
          onClick={handleLike}
          className="btn-primary my-2 mx-1"
        >Like
        </button>
      </p>
      <p>added by {blog.author}</p>
      <h3 className="text-2xl font-semibold my-3 bg-blue-300 w-full text-center p-2">Comments</h3>
      <form onSubmit={addComment} className="bg-slate-500 rounded-xl">
        <input name="comment" placeholder="comment.." className="bg-slate-500 mx-2" />
        <button type="submit" className="btn-primary">add comment</button>
      </form>
      <ul className="w-full">
        {blog.comments.map((c) => (
          <li key={c.id} className="border-2 border-black m-3">{c.content}</li>
        ))}
      </ul>
    </div>
  );
}

export default BlogMatch;
