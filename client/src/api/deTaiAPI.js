import axios from 'axios';
import * as Utils from '../utils/utils';

export const getDeTais = () => {
  return axios.get('/de-tais');
}

export const getDeTaisWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  const filterStr = Utils.getFilterString(filters);
  return axios.post(`/de-tais/q?${filterStr}`, options);
}

export const getDeTaisWithPendingApproval = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  const filterStr = Utils.getFilterString(filters);
  return axios.post(`/de-tais/get-pending-approval?${filterStr}`, options);
}

export const getDeTaiById = (id) => {
  return axios.get(`/de-tais/${id}`);
}

export const getDeTaiBySinhVienId = (sinhVienid) => {
  return axios.get(`/de-tais/get-by-sinh-vien/${sinhVienid}`);
}

export const getCurDeTaisByGiangVienId = (giangVienId) => {
  return axios.get(`/de-tais/get-active-by-giang-vien/${giangVienId}`);
}

export const getDeTaisByKTHId = (kyThucHienId) => {
  return axios.get(`/de-tais/get-by-ky-thuc-hien/${kyThucHienId}`);
}

export const getDeTaisWithHoiDong = () => {
  return axios.get(`/de-tais/w/get-with-hoi-dong`);
}

export const updateDeTaiById = (id, deTai) => {
  let token = localStorage.getItem('token');
  return axios.post(`/de-tais/update/${id}`, { deTai: deTai, token: token });
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

export const continueApprove = (deTaiId, sv, approval) => {
  return axios.post(`/de-tais/continue-approve/${deTaiId}/${sv}`, approval);
}

export const updateNameChange = (changeList) => {
  return axios.post('/de-tais/update-name-change', changeList);
}
