import axios from 'axios';

export const getDeTais = () => {
  return axios.get('/de-tais');
}

export const createManyDeTais = (deTais) => {
  return axios.post('/de-tais/create-many', deTais);
}
