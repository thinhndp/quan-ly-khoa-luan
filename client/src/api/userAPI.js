import axios from 'axios';
import * as Utils from '../utils/utils';

export const getUsers = () => {
  return axios.get('/users');
}

export const getUsersWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  return axios.post('/users/q', options);
}

export const getUserById = (id) => {
  return axios.get(`/users/${id}`);
}

export const createUser = (user) => {
  return axios.post('/users', user);
}

export const deleteUserById = (id) => {
  return axios.delete(`/users/${id}`);
}

export const updateUserById = (id, user) => {
  return axios.post(`/users/${id}`, user);
}
