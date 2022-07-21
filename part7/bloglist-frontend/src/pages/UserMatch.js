/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function UserMatch({ user }) {
  if (!user) {
    return null;
  }
  return (
    <div className="my-10 w-full">
      <h2 className="text-2xl font-bold text-center">{user.username}</h2>
      <h3 className="text-lg font-semibold text-center my-4 bg-blue-300 w-full p-2">Added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id} className="font-bold text-blue-700 text-center my-2">
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserMatch;
