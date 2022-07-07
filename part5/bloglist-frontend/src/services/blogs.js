import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null;
const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const getAll = async () => {
  const request = await axios.get(baseUrl)
  return request.data
}

const postBlog = async (newBlog) => {
  const config = { headers: { 'Authorization': token, 'content-type': 'application/json' }};
  const response = await axios.post(baseUrl, newBlog, config);
  return response.data;
}

const putBlog = async (newBlog) => {
  const response = await axios.put(`${baseUrl}/${newBlog.id}`, newBlog);
  return response.data;
}

const deleteBlog = async (id) => {
  const config = { headers: { 'Authorization': token }};
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
}

const blogService = {
  getAll, postBlog, setToken, putBlog, deleteBlog
}
export default blogService;
