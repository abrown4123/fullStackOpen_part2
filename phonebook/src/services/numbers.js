import axios from 'axios';

const baseURL = "/api/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
}

const create = newEntry => {
  const request = axios.post(baseURL, newEntry);
  return request.then(response => response.data);
}

const update = (id, updatedEntry) => {
  const request = axios.put(`${baseURL}/${id}`, updatedEntry);
  return request.then(response => response.data);
}

const removeNumber = id => {
  const request = axios.delete(`${baseURL}/${id}`);
  return request.then(response => response.data);
}

export default { getAll, create, update, removeNumber };
