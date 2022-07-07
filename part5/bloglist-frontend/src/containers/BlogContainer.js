import { useEffect } from "react"
import blogService from "../services/blogs"
import Blog from "../components/Blog"

const BlogContainer = ({ blogs, setBlogs, username }) => {
  useEffect(() => {
    const fetchData = async () =>{
      const blogsL = await blogService.getAll();
      blogsL.sort((a, b) => b.likes - a.likes);
      setBlogs( blogsL );
      console.log(blogsL);
    }
    fetchData();
  }, [setBlogs])

  const handleLike = async (blog) => {
    const likedBlog = {
      ...blog, likes: blog.likes + 1,
    }
    await blogService.putBlog(likedBlog);
    const newBlogs = [...blogs];
    newBlogs[newBlogs.indexOf(blog)] = likedBlog;
    newBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(newBlogs)
  }
  const handleDelete = async (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      const data = await blogService.deleteBlog(blog.id);
      console.log(data);
      const newBlogs = blogs.filter((b) => b.id !== blog.id);
      setBlogs(newBlogs);
    }
  }

  return (
    <div>
      {blogs.map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          handleLike={handleLike}
          username={username}
          handleDelete={handleDelete}
        />
      )} 
    </div>
  )
}

export default BlogContainer