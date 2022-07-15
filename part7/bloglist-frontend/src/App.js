import { useEffect, useRef } from 'react';
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

function App() {
  const { user, notification } = useSelector((st) => st);
  // const [blogs, setBlogs] = useState([]);
  // const [user, setUser] = useState({});
  // const [credentials, setCredentials] = useState({
  //   username: '', password: '',
  // });
  // const [notification, setNotification] = useState({ msg: '', isError: false });

  const dispatch = useDispatch();

  const createBlogRef = useRef();

  useEffect(() => {
    const blogsappUser = localStorage.getItem('blogsappUser');
    if (blogsappUser) {
      // setUser(() => JSON.parse(blogsappUser));
      dispatch(setItem('user', JSON.parse(blogsappUser)));
      blogService.setToken(JSON.parse(blogsappUser).token);
    }
  }, []);

  const showNotification = (msg, isError = false, ms = 3000) => {
    // setNotification(() => ({ msg, isError }));
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

          <Togglable buttonLabel="new blog" ref={createBlogRef}>
            <CreateBlog
              blogService={blogService}
              showNotification={showNotification}
              toggleVisibility={() => createBlogRef.current.toggleVisibility()}
            />
          </Togglable>

          <BlogContainer username={user.username} />

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

    </div>
  );
}

export default App;
