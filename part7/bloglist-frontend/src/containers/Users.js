import React, { useEffect, useState } from 'react';
import userService from '../services/users';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const datas = await userService.getAll();
      setUsers(datas);
    };
    getData();
  }, []);

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
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
