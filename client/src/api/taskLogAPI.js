import axios from 'axios';
import * as Utils from '../utils/utils';

export const getTaskLogs = () => {
  return axios.get('/task-logs');
}

export const getTaskLogsWithQuery = (search = '', pagingOptions = Utils.getNewPagingOptions(), filters = {}) => {
  var options = {
    search: search,
    pagingOptions: pagingOptions,
  };
  const filterStr = Utils.getFilterString(filters);
  console.log('filters');
  console.log(filters);
  console.log('filterStr');
  console.log(filterStr);
  return axios.post(`/task-logs/q?${filterStr}`, options);
}

export const getTaskLogById = (id) => {
  return axios.get(`/task-logs/${id}`);
}

export const createTaskLog = (taskLog) => {
  return axios.post('/task-logs', taskLog);
}

export const deleteTaskLogById = (id) => {
  return axios.delete(`/task-logs/${id}`);
}

export const updateTaskLogById = (id, taskLog) => {
  return axios.post(`/task-logs/${id}`, taskLog);
}
