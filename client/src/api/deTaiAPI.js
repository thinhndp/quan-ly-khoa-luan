import axios from 'axios';

export const getDeTais = () => {
  return axios.get('/de-tais');
}

export const getDeTaisWithQuery = (search = '') => {
  const query = {
    search: search
  };
  console.log(query);
  return axios.post('/de-tais/q', query);
}

export const getDeTaiById = (id) => {
  return axios.get(`/de-tais/${id}`);
}

export const updateDeTaiById = (id, deTai) => {
  return axios.post(`/de-tais/update/${id}`, deTai);
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
