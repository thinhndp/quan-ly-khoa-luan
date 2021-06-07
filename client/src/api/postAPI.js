import axios from 'axios';

export const getAllPosts = () => {
  return axios.get('/posts');
}

export const getPublicPosts = () => {
  return axios.get('/posts/public');
}

export const getPrivatePosts = () => {
  return axios.get('/posts/private');
}

export const getPostById = (id) => {
  return axios.get(`/posts/${id}`);
}

export const getPostWSubmitterById = (id) => {
  return axios.get(`/posts/with-submitter/${id}`);
}
