/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';

function Users({ users }) {
  return (
    <div className="my-10">
      <table>
        <tbody>
          <tr>
            <td className="font-semibold"><p className="mx-4">Users</p></td>
            <td className="font-semibold"><p className="mx-4">blogs created</p></td>
          </tr>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`} className="text-blue-700 font-bold mx-4">{user.username}</Link>
              </td>
              <td><p className="mx-4">{user.blogs.length}</p></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
