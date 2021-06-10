import axios from 'axios';

export const getKyThucHiens = () => {
  return axios.get('/ky-thuc-hiens');
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
