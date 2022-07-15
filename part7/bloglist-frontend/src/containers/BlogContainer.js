/* eslint-disable no-alert */
/* eslint-disable react/forbid-prop-types */
import { useEffect } from 'react';
import propTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import blogService from '../services/blogs';
import Blog from '../components/Blog';
import { setItem } from '../reducer/appReducer';

function BlogContainer({ username }) {
  const blogs = useSelector((st) => st.blogs);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const blogsL = await blogService.getAll();
      blogsL.sort((a, b) => b.likes - a.likes);
      dispatch(setItem('blogs', blogsL));
    };
    fetchData();
  }, []);

  const handleLike = async (blog) => {
    const likedBlog = {
      ...blog, likes: blog.likes + 1,
    };
    await blogService.putBlog(likedBlog);
    const newBlogs = [...blogs];
    newBlogs[newBlogs.indexOf(blog)] = likedBlog;
    newBlogs.sort((a, b) => b.likes - a.likes);
    dispatch(setItem('blogs', newBlogs));
  };
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      await blogService.deleteBlog(blog.id);
      const newBlogs = blogs.filter((b) => b.id !== blog.id);
      dispatch(setItem('blogs', newBlogs));
    }
  };

  return (
    <div>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          username={username}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
}

export default BlogContainer;

BlogContainer.propTypes = {
  username: propTypes.string.isRequired,
};
