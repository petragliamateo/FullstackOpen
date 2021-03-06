import axios from "axios";

const baseURL = '/api/persons';

const getAll = () => {
  const response = axios.get(baseURL);
  return response.then((response) => response.data);
}

const postData = (data) => {
  const response = axios.post(baseURL, data);
  return response;
}

const deleteData = (id) => {
  return axios.delete(`${baseURL}/${id}`);
}

const updateData = (id, newData) => {
  const response = axios.put(`${baseURL}/${id}`, newData)
  return response;
}

export { getAll, postData, deleteData, updateData };