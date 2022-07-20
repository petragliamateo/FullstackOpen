/* eslint-disable react/forbid-prop-types */
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function Blog({
  blog,
}) {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={blogStyle} className="blogDiv">
      <Link to={`/blogs/${blog.id}`}>{`${blog.title} ${blog.author}`}</Link>
    </div>
  );
}

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
