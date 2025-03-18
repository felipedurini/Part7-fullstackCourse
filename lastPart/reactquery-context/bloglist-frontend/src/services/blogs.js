import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

export const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

export const create = async (newObject) => {
  const config = {
    headers: { Authorization: token },
  };
console.log(token);

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const erase = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(`${baseUrl}/${blog.id}`, config);
  return response.data;
};

const update = (newObject) => {
  const request = axios.put(`${baseUrl}/${newObject.id}`, newObject);
  return request.then((response) => response.data);
};

export default { getAll, create, update, setToken, erase };
