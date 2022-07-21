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
    <Link to={`/blogs/${blog.id}`}>
      <div
        style={blogStyle}
        className="blogDiv bg-blue-200 hover:bg-blue-300 transition-colors text-center font-semibold mx-8 mb-2"
      >
        {`${blog.title} ${blog.author}`}
      </div>
    </Link>
  );
}

export default Blog;

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
};
