import axios from "axios";

const baseURL = 'http://localhost:3001/persons';

const getAll = () => {
  const response = axios.get(baseURL);
  return response.then((response) => response.data);
}

const postData = (data) => {
  const response = axios.post(baseURL, data);
  return response.then((res) => res.data);
}

export {getAll, postData};