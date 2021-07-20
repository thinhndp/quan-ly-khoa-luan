import axios from 'axios';
import * as Utils from '../utils/utils';

export const getPhongHocs = () => {
  return axios.get('/phong-hocs');
}

export const getPhongHocsWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  const filterStr = Utils.getFilterString(filters);
  return axios.post(`/phong-hocs/q?${filterStr}`, options);
}

export const getPhongHocById = (id) => {
  return axios.get(`/phong-hocs/${id}`);
}

export const createPhongHoc = (phongHoc) => {
  return axios.post('/phong-hocs', phongHoc);
}

export const deletePhongHocById = (id) => {
  return axios.delete(`/phong-hocs/${id}`);
}

export const updatePhongHocById = (id, phongHoc) => {
  return axios.post(`/phong-hocs/${id}`, phongHoc);
}
