/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Route, Routes, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Login from './components/Login';
import login from './services/login';
import blogService from './services/blogs';
import Notification from './components/Notification';
import './index.css';
import UserMatch from './pages/UserMatch';
import userService from './services/users';
import Main from './pages/Main';

import { setItem } from './reducer/appReducer';
import Users from './pages/Users';
import BlogMatch from './pages/BlogMatch';

function App() {
  const { user, notification, blogs } = useSelector((st) => st);
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const match = useMatch('/users/:id');
  const userMatch = match
    ? users.find((u) => u.id === match.params.id)
    : null;
  const matchB = useMatch('/blogs/:id');
  const blogMatch = matchB
    ? blogs.find((u) => u.id === matchB.params.id)
    : null;

  useEffect(() => {
    const blogsappUser = localStorage.getItem('blogsappUser');
    if (blogsappUser) {
      dispatch(setItem('user', JSON.parse(blogsappUser)));
      blogService.setToken(JSON.parse(blogsappUser).token);
    }

    const getData = async () => {
      const datas = await userService.getAll();
      setUsers(datas);
    };
    getData();
  }, []);

  const showNotification = (msg, isError = false, ms = 3000) => {
    dispatch(setItem('notification', { msg, isError }));
    setTimeout(() => {
      dispatch(setItem('notification', { msg: '', isError: false }));
    }, ms);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const { username, password } = event.target;
    const credentials = {
      username: username.value,
      password: password.value,
    };
    try {
      const userNew = await login(credentials);
      dispatch(setItem('user', userNew));
      username.value = '';
      password.value = '';
      localStorage.setItem('blogsappUser', JSON.stringify(userNew));
      blogService.setToken(userNew.token);
    } catch {
      showNotification('wrong username or password', true);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('blogsappUser');
    dispatch(setItem('user', {}));
  };

  return (
    <div>
      {user.username ? (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <div>
            {`${user.username} logged in`}
            <button type="submit" onClick={handleLogout}>logout</button>
          </div>
          <br />
        </div>
      ) : (
        <div>
          <h2>log in to application</h2>
          <Notification notification={notification} />
          <Login
            handleSubmit={handleLogin}
          />
        </div>

      )}
      <Routes>
        <Route
          path="/"
          element={<Main username={user.username} showNotification={showNotification} />}
        />
        <Route path="/users" element={<Users users={users} />} />
        <Route path="/users/:id" element={<UserMatch user={userMatch} />} />
        <Route path="/blogs/:id" element={<BlogMatch blog={blogMatch} />} />
      </Routes>
    </div>

  );
}

export default App;
