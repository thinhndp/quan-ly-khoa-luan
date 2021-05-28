import axios from 'axios';

export const getBieuMaus = () => {
  return axios.get('/bieu-maus');
}

export const getBieuMauById = (id) => {
  return axios.get(`/bieu-maus/${id}`);
}

export const createBieuMau = (bieuMau) => {
  return axios.post('/bieu-maus', bieuMau);
}

export const deleteBieuMauById = (id) => {
  return axios.delete(`/bieu-maus/${id}`);
}

export const updateBieuMauById = (id, bieuMau) => {
  return axios.post(`/bieu-maus/${id}`, bieuMau);
}
