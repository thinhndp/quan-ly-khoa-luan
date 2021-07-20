import axios from 'axios';
import * as Utils from '../utils/utils';
import { MOCK_DATA, MOCK_FILES } from '../data/mock-data';

export const getThuMucs = () => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ data: MOCK_DATA.thuMucs });
  //   }, 500);
  // })
  return axios.get('/thu-mucs');
}

export const getFilesBySinhVienId = (id, search = '', pagingOptions = Utils.getNewPagingOptions()) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  return axios.post(`/thu-mucs/get-files-by-sinh-vien/${id}`, options);
}

export const getThuMucsWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  const filterStr = Utils.getFilterString(filters);
  return axios.post(`/thu-mucs/q?${filterStr}`, options);
}

export const getThuMucById = (id) => {
  return axios.get(`/thu-mucs/${id}`);
}

export const createThuMuc = (thuMuc) => {
  return axios.post('/thu-mucs', thuMuc);
}

export const updateThuMucById = (id, thuMuc) => {
  return axios.post(`/thu-mucs/${id}`, thuMuc);
}

export const createFilesInFolder = (folderId, files) => {
  return axios.post(`/thu-mucs/${folderId}/create-files`, files);
}

export const getFilesByThuMucId = (folderId) => {
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ data: MOCK_FILES });
  //   }, 500);
  // })
  return axios.get(`/thu-mucs/${folderId}/get-files`);
}

export const getFilesOfFolderWithQuery = (folderId, search = '', pagingOptions = Utils.getNewPagingOptions()) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  return axios.post(`/thu-mucs/${folderId}/get-files/q`, options);
}

// export const createManyDeTais = (deTais) => {
//   return axios.post('/de-tais/create-many', deTais);
// }

export const deleteThuMuc = (id) => {
  return axios.delete(`/thu-mucs/${id}`);
}

// export const applyForDeTai = (deTaiId, sinhVienId) => {
//   return axios.post('/de-tais/apply', { deTaiId: deTaiId, sinhVienId: sinhVienId });
// }
