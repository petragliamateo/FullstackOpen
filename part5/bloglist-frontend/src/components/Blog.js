import { useState } from "react";

const Blog = ({blog}) => {
  const [visible, setVisible] = useState(false);
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  console.log(blog);

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
          <button>like</button><br />
          {blog.user.name}
        </div>
      )}
    </div>  
  )
}

export default Blog;
