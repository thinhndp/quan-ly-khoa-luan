import axios from 'axios';

const path = '/custom-setting';

export const getCustomSettings = (name) => {
  return axios.post(`${path}/get`, name);
}

export const updateCustomSetting = (name, values) => {
	return axios.post(`${path}/update`, { name: name, values: values });
}
