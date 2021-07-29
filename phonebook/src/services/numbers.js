import axios from 'axios';

const baseURL = "http://localhost:3000/persons";

const getAll = () => {
  const request = axios.get(baseURL);
  return request.then(response => response.data);
}

const create = newEntry => {
  const request = axios.post(baseURL, newEntry);
  return request.then(response => response.data);
}

const update = id => {
  const request = axios.put(`${baseURL}/${id}`);
  return request.then(response => response.data);
}

export default { getAll, create, update };
