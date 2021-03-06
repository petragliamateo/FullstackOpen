/* eslint-disable react/prop-types */
/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import propTypes from 'prop-types';

function CreateBlog({
  blogService, setBlogs, showNotification, toggleVisibility, handleSubmit,
}) {
  const fields = ['title', 'author', 'url'];
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: '',
  });

  const createBlog = async (event) => {
    if (handleSubmit) {
      handleSubmit(newBlog);
      return;
    }
    event.preventDefault();
    await blogService.postBlog(newBlog);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
    showNotification(`a new blog ${newBlog.title} by ${newBlog.author}`);
    setNewBlog({ title: '', author: '', url: '' });
    toggleVisibility();
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        {fields.map((name) => (
          <div key={name}>
            {name}
            <input
              type="text"
              id={name}
              name={name}
              value={newBlog[name]}
              onChange={({ target }) => setNewBlog((prev) => ({ ...prev, [name]: target.value }))}
            />
          </div>
        ))}
        <button id="createButton" type="submit">create</button>
      </form>
    </div>
  );
}

export default CreateBlog;

CreateBlog.propTypes = {
  blogService: propTypes.object.isRequired,
  setBlogs: propTypes.func.isRequired,
  showNotification: propTypes.func.isRequired,
  toggleVisibility: propTypes.func.isRequired,
};
