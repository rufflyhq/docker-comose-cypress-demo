import axios from 'axios';
import { baseUrl } from './config';

const getUsers = () => {
  const url = `${baseUrl()}/users`;

  return axios.get(url).then(response => {
    const { data } = response.data;
    console.log('data-> ', data);
    return Promise.resolve({ data });
  });
};

const createUser = ({ name, email }) => {
  const url = `${baseUrl()}/users`;
  const body = { name, email };

  return axios.post(url, body).then(response => {
    const { data } = response.data;
    return Promise.resolve({ data });
  });
};

const deleteUser = ({ email }) => {
  const url = `${baseUrl()}/users/${email}`;

  return axios.delete(url);
};

export default {
  getUsers,
  createUser,
  deleteUser,
};
