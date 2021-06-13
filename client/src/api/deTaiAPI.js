import axios from 'axios';
import * as Utils from '../utils/utils';

export const getDeTais = () => {
  return axios.get('/de-tais');
}

export const getDeTaisWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  return axios.post('/de-tais/q', options);
}

export const getDeTaiById = (id) => {
  return axios.get(`/de-tais/${id}`);
}

export const updateDeTaiById = (id, deTai) => {
  return axios.post(`/de-tais/update/${id}`, deTai);
}

export const createManyDeTais = (deTais) => {
  return axios.post('/de-tais/create-many', deTais);
}

export const deleteDeTaiById = (id) => {
  return axios.delete(`/de-tais/${id}`);
}

export const applyForDeTai = (deTaiId, sinhVienId) => {
  return axios.post('/de-tais/apply', { deTaiId: deTaiId, sinhVienId: sinhVienId });
}
