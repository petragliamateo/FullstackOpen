import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Login from './components/Login'
import login from './services/login'
import blogService from './services/blogs'
import CreateBlog from './components/CreateBlog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState({})
  const [credentials, setCredentials] = useState({
    username: '', password: '',
  })
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: '',
  })

  useEffect(() => {
    const blogsappUser = localStorage.getItem('blogsappUser');
    if (blogsappUser) {
      setUser(() => JSON.parse(blogsappUser));
      blogService.setToken(JSON.parse(blogsappUser).token);
    }

    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await login(credentials);
      setUser(user);
      setCredentials({username: '', password: ''});
      localStorage.setItem('blogsappUser', JSON.stringify(user));
      blogService.setToken(user.token);
    } catch {}
  }
  const handleLogout = () => {
    localStorage.removeItem('blogsappUser');
    setUser({})
  }
  const createBlog = async (event) => {
    event.preventDefault();
    console.log(newBlog);
    const data = await blogService.postBlog(newBlog);
    setBlogs((prev) => prev.concat(data));
  }

  return (
    <div>
      {user.username ? (
        <div>
          <h2>blogs</h2>
          <div>
            <label>{user.username} logged in</label>
            <button onClick={handleLogout}>logout</button>
          </div>
          <br />
          <CreateBlog newBlog={newBlog} setNewBlog={setNewBlog} handleSubmit={createBlog} />
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}          
        </div>
      ) : (
        <Login
          handleSubmit={handleLogin} credentials={credentials} setCredentials={setCredentials}
        />
      )}

    </div>
  )
}

export default App
