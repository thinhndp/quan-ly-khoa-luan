import axios from 'axios';

export const getHoiDongs = () => {
  return axios.get('/hoi-dongs');
}

export const getHoiDongById = (id) => {
  return axios.get(`/hoi-dongs/${id}`);
}

export const createHoiDong = (hoiDong) => {
  return axios.post('/hoi-dongs', hoiDong);
}

export const deleteHoiDongById = (id) => {
  return axios.delete(`/hoi-dongs/${id}`);
}

export const updateHoiDongById = (id, hoiDong) => {
  return axios.post(`/hoi-dongs/${id}`, hoiDong);
}
