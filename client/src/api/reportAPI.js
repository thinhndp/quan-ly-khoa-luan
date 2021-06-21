import axios from 'axios';
import * as Utils from '../utils/utils';

export const getTaskLogReportBySVId = (id) => {
  return axios.get(`/reports/task-logs/${id}`);
}
