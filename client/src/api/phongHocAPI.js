import axios from 'axios';

export const getPhongHocs = () => {
  return axios.get('/phong-hocs');
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
