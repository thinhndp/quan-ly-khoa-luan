import axios from 'axios';
import * as Utils from '../utils/utils';

export const getHoiDongs = () => {
  return axios.get('/hoi-dongs');
}

export const getHoiDongsWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions()) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  return axios.post('/hoi-dongs/q', options);
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
