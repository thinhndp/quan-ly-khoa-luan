import axios from 'axios';
import * as Utils from '../utils/utils';

export const getSinhViens = () => {
  return axios.get('/sinh-viens');
}

export const getSinhViensWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  return axios.post('/sinh-viens/q', options);
}

export const getSinhVienById = (id) => {
  return axios.get(`/sinh-viens/${id}`);
}

export const deleteSinhVienById = (id) => {
  return axios.delete(`/sinh-viens/${id}`);
}

export const upsertSinhViens = (sinhViens) => {
  return axios.post('/sinh-viens/upsert-many/', sinhViens);
}

export const updateSinhVienById = (id, sinhVien) => {
  return axios.post(`/sinh-viens/${id}`, sinhVien);
}
