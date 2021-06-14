import axios from 'axios';
import * as Utils from '../utils/utils';

export const getAllPosts = () => {
  return axios.get('/posts');
}

export const getPostsWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  return axios.post('/posts/q', options);
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
