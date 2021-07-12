import axios from 'axios';
import * as Utils from '../utils/utils';

export const getAllPosts = () => {
  return axios.get('/posts');
}

export const getPostsWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  var filterStr = Utils.getFilterString(filters);
  // filterStr += "&-postedTime";
  return axios.post(`/posts/q?${filterStr}`, options);
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

export const deletePostById = (id) => {
  return axios.delete(`/posts/${id}`);
}

export const createPost = (post) => {
  return axios.post('/posts/', post);
}

export const updatePostById = (id, post) => {
  return axios.post(`/posts/${id}`, post);
}
