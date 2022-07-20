/* eslint-disable react/prop-types */
import { useRef } from 'react';

import Togglable from '../components/Toggleable';
import BlogContainer from '../containers/BlogContainer';
import CreateBlog from '../components/CreateBlog';
import blogService from '../services/blogs';

function Main({ showNotification, username }) {
  const createBlogRef = useRef();
  if (!username) {
    return null;
  }
  return (
    <div>
      <Togglable buttonLabel="new blog" ref={createBlogRef}>
        <CreateBlog
          blogService={blogService}
          showNotification={showNotification}
          toggleVisibility={() => createBlogRef.current.toggleVisibility()}
        />
      </Togglable>
      <BlogContainer username={username} />
    </div>
  );
}

export default Main;
