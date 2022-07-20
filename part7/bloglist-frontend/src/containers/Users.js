/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function Users({ users }) {
  return (
    <div>
      <h2>Users</h2>
      <table>
        <tbody>
          <tr>
            <td />
            <td>blogs created</td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.username}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
