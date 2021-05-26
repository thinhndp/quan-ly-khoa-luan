import axios from 'axios';

const path = '/system-setting';

export const getSystemSettings = () => {
  return axios.get(path);
}

export const updateSystemSetting = (sysSetting) => {
  return axios.post(path, sysSetting);
}
