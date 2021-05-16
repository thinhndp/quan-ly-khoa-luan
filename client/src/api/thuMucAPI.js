import axios from 'axios';
import { MOCK_DATA } from '../data/mock-data';

export const getThuMucs = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ data: MOCK_DATA.thuMucs });
    }, 1000);
  })
  // return axios.get('/de-tais');
}

export const createThuMuc = (thuMuc) => {
  return axios.post('/thu-mucs', thuMuc);
}

export const updateThuMucById = (id, thuMuc) => {
  return axios.post(`/thu-mucs/${id}`, thuMuc);
}

// export const createManyDeTais = (deTais) => {
//   return axios.post('/de-tais/create-many', deTais);
// }

// export const deleteDeTaiById = (id) => {
//   return axios.delete(`/de-tais/${id}`);
// }

// export const applyForDeTai = (deTaiId, sinhVienId) => {
//   return axios.post('/de-tais/apply', { deTaiId: deTaiId, sinhVienId: sinhVienId });
// }
