/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Login from './components/Login';
import login from './services/login';
import blogService from './services/blogs';
import CreateBlog from './components/CreateBlog';
import Notification from './components/Notification';
import './index.css';
import Togglable from './components/Toggleable';
import BlogContainer from './containers/BlogContainer';

import { setItem } from './reducer/appReducer';
import Users from './containers/Users';

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

function App() {
  const { user, notification } = useSelector((st) => st);
  const dispatch = useDispatch();

  useEffect(() => {
    const blogsappUser = localStorage.getItem('blogsappUser');
    if (blogsappUser) {
      dispatch(setItem('user', JSON.parse(blogsappUser)));
      blogService.setToken(JSON.parse(blogsappUser).token);
    }
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
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>

  );
}

export default App;
