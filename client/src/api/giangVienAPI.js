import axios from 'axios';

export const getGiangViens = () => {
  return axios.get('/giang-viens');
}

export const getGiangVienById = (id) => {
  return axios.get(`/giang-viens/${id}`);
}

export const deleteGiangVienById = (id) => {
  return axios.delete(`/giang-viens/${id}`);
}

export const upsertGiangViens = (giangViens) => {
  return axios.post('/giang-viens/upsert-many/', giangViens);
}

export const updateGiangVienById = (id, giangVien) => {
  return axios.post(`/giang-viens/${id}`, giangVien);
}
