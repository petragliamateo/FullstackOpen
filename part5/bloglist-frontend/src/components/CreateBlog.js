import { useState } from 'react'

const CreateBlog = ({ blogService, setBlogs, showNotification, toggleVisibility }) => {
  const fields = ['title', 'author', 'url']
  const [newBlog, setNewBlog] = useState({
    title: '', author: '', url: '',
  })

  const createBlog = async (event) => {
    event.preventDefault();
    await blogService.postBlog(newBlog);
    const blogs = await blogService.getAll();
    setBlogs(blogs);
    showNotification(`a new blog ${newBlog.title} by ${newBlog.author}`);
    setNewBlog({ title: '', author: '', url: '' })
    toggleVisibility();
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        {fields.map((name) => (
          <div key={name}>
            <label id={name}>{name}</label>
            <input
              type='text'
              name={name}
              value={newBlog[name]}
              onChange={({target}) => setNewBlog((prev) => ({...prev, [name]: target.value}))}
            />
          </div>
        ))}
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default CreateBlog