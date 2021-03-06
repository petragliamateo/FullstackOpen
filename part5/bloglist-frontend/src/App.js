import { useState, useEffect, useRef } from 'react';
import Login from './components/Login';
import login from './services/login';
import blogService from './services/blogs';
import CreateBlog from './components/CreateBlog';
import Notification from './components/Notification';
import './index.css';
import Togglable from './components/Toggleable';
import BlogContainer from './containers/BlogContainer';

function App() {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState({});
  const [credentials, setCredentials] = useState({
    username: '', password: '',
  });
  const [notification, setNotification] = useState({ msg: '', isError: false });

  const createBlogRef = useRef();

  useEffect(() => {
    const blogsappUser = localStorage.getItem('blogsappUser');
    if (blogsappUser) {
      setUser(() => JSON.parse(blogsappUser));
      blogService.setToken(JSON.parse(blogsappUser).token);
    }
  }, []);

  const showNotification = (msg, isError = false, ms = 3000) => {
    setNotification(() => ({ msg, isError }));
    setTimeout(() => {
      setNotification({ msg: '', isError: false });
    }, ms);
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const userNew = await login(credentials);
      setUser(userNew);
      setCredentials({ username: '', password: '' });
      localStorage.setItem('blogsappUser', JSON.stringify(userNew));
      blogService.setToken(userNew.token);
    } catch {
      showNotification('wrong username or password', true);
    }
  };
  const handleLogout = () => {
    localStorage.removeItem('blogsappUser');
    setUser({});
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

          <Togglable buttonLabel="new note" ref={createBlogRef}>
            <CreateBlog
              blogService={blogService}
              setBlogs={setBlogs}
              showNotification={showNotification}
              toggleVisibility={() => createBlogRef.current.toggleVisibility()}
            />
          </Togglable>

          <BlogContainer blogs={blogs} setBlogs={setBlogs} username={user.username} />

        </div>
      ) : (
        <div>
          <h2>log in to application</h2>
          <Notification notification={notification} />
          <Login
            handleSubmit={handleLogin}
            credentials={credentials}
            setCredentials={setCredentials}
          />
        </div>

      )}

    </div>
  );
}

export default App;
