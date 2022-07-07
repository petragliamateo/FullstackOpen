import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import login from './services/login'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'
import Notification from './components/Notification'
import './index.css'
import Togglable from './components/Toggleable'
import BlogContainer from './containers/BlogContainer'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})
  const [credentials, setCredentials] = useState({
    username: '', password: '',
  })
  const [notification, setNotification] = useState({msg: '', isError: false});

  const createBlogRef = useRef();

  useEffect(() => {
    const blogsappUser = localStorage.getItem('blogsappUser');
    if (blogsappUser) {
      setUser(() => JSON.parse(blogsappUser));
      blogService.setToken(JSON.parse(blogsappUser).token);
    } 
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login(credentials);
      setUser(user);
      setCredentials({username: '', password: ''});
      localStorage.setItem('blogsappUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch {
      showNotification('wrong username or password', true)
    }
  }
  const handleLogout = () => {
    localStorage.removeItem('blogsappUser');
    setUser({})
  }

  const showNotification = (msg, isError = false, ms = 3000) => {
    setNotification(() => ({ msg, isError }))
    setTimeout(() => {
      setNotification({ msg: '', isError: false })
    }, ms)
  }

  return (
    <div>
      {user.username ? (
        <div>
          <h2>blogs</h2>
          <Notification notification={notification} />
          <div>
            <label>{user.username} logged in</label>
            <button onClick={handleLogout}>logout</button>
          </div>

          <br />

          <Togglable buttonLabel={'new note'} ref={createBlogRef}>
            <CreateBlog
              postBlog={blogService.postBlog}
              setBlogs={setBlogs}
              showNotification={showNotification}
              toggleVisibility={() => createBlogRef.current.toggleVisibility()}
            />
          </Togglable>

          <BlogContainer blogs={blogs} setBlogs={setBlogs} />

        </div>
      ) : (
        <div>
          <h2>log in to application</h2>
          <Notification notification={notification} />
          <Login
            handleSubmit={handleLogin} credentials={credentials} setCredentials={setCredentials}
          />          
        </div>

      )}

    </div>
  )
}

export default App;
