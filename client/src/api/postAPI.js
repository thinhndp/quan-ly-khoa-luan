import axios from 'axios';

export const getPostById = (id) => {
  return axios.get(`/posts/${id}`);
}

export const getPostWSubmitterById = (id) => {
  return axios.get(`/posts/with-submitter/${id}`);
}
