import { useState } from "react";

const Blog = ({ blog, handleLike, username, handleDelete }) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setVisible((prev) => !prev)}>
          {visible ? 'hide' : 'view'}
        </button>
      </div>
      {visible && (
        <div>
          {blog.url}<br />
          {`likes: ${blog.likes}`}
          <button onClick={() => handleLike(blog)}>like</button><br />
          {blog.user.name} <br />
          {blog.user.username === username && (
            <button onClick={() => handleDelete(blog)}>remove</button>
          )}
        </div>
      )}
    </div>  
  )
}

export default Blog;
