/* eslint-disable react/forbid-prop-types */
import { useState } from 'react';
import PropTypes from 'prop-types';

function Blog({
  blog, handleLike, username, handleDelete,
}) {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blogDiv">
      <div>
        {`${blog.title} ${blog.author}`}
        <button type="submit" className="viewButton" onClick={() => setVisible((prev) => !prev)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div className="blogVisible">
          {blog.url}
          <br />
          {`likes: ${blog.likes}`}
          <button type="submit" className="likeButton" onClick={() => handleLike(blog)}>like</button>
          <br />
          {blog.user.name}
          <br />
          {blog.user.username === username && (
            <button type="submit" className="removeButton" onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  );
}

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLike: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  handleDelete: PropTypes.func.isRequired,
};
