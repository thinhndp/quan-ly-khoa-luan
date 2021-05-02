import axios from 'axios';

export const getDeTais = () => {
  return axios.get('/de-tais');
}

export const createManyDeTais = (deTais) => {
  return axios.post('/de-tais/create-many', deTais);
}

export const deleteDeTaiById = (id) => {
  return axios.delete(`/de-tais/${id}`);
}
