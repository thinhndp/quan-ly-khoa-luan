import axios from 'axios';

export const getSinhViens = () => {
  return axios.get('/sinh-viens');
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
