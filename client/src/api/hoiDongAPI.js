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

// export const deletePhongHocById = (id) => {
//   return axios.delete(`/phong-hocs/${id}`);
// }

// export const updatePhongHocById = (id, phongHoc) => {
//   return axios.post(`/phong-hocs/${id}`, phongHoc);
// }
