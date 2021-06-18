import axios from 'axios';
import * as Utils from '../utils/utils';

export const getKyThucHiens = () => {
  return axios.get('/ky-thuc-hiens');
}

export const getKyThucHiensWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  const filterStr = Utils.getFilterString(filters);
  return axios.post(`/ky-thuc-hiens/q?${filterStr}`, options);
}

export const getKyThucHienById = (id) => {
  return axios.get(`/ky-thuc-hiens/${id}`);
}

export const getOneActiveKyThucHien = () => {
  return axios.get('/ky-thuc-hiens/active');
}

export const createKyThucHien = (kyThucHien) => {
  return axios.post('/ky-thuc-hiens', kyThucHien);
}

export const deleteKyThucHienById = (id) => {
  return axios.delete(`/ky-thuc-hiens/${id}`);
}

export const updateKyThucHienById = (id, kyThucHien) => {
  return axios.post(`/ky-thuc-hiens/${id}`, kyThucHien);
}
