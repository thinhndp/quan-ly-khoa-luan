import TaskLog from '../models/TaskLog.js';
import DeTai from '../models/DeTai.js';
import * as Utils from '../utils/utils.js';

export const getTaskLogs = (req, res) => {
  TaskLog.find()
    .then((taskLogs) => {
      res.status(200).json(taskLogs);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getTaskLogsWithQuery = (req, res) => {
  // Search and Paging
  const { search, pagingOptions } = req.body;

  // Filters
  const reqQuery = { ...req.query };
  const removeFields = [ "sort" ];
  removeFields.forEach((val) => delete reqQuery[val]);
  let queryStr = JSON.stringify(reqQuery);
  queryStr = Utils.getConvertedQueryString(queryStr);

  const queryFilters = JSON.parse(queryStr);
  var rawFilters = {
    description: '',
    sinhVienId: '',
    logDate: { $gte: '1970-01-01T00:00:00.000Z', $lte: '2036-12-31T23:59:59.000Z' },
    spentTime: { $gte: '0.5', $lte: '24' },
    commitLink: ''
  }
  rawFilters = { ...rawFilters, ...queryFilters };
  var filters = {
    description: rawFilters.description == '' ? Utils.getIncludeFilter(search) : Utils.getIncludeFilter(rawFilters.description),
    sinhVien: rawFilters.sinhVienId,
    logDate: rawFilters.logDate,
    spentTime: rawFilters.spentTime,
    commitLink: Utils.getIncludeFilter(rawFilters.commitLink),
  };
  if (filters.sinhVien == '') {
    delete filters.sinhVien;
  }
  console.log(filters);

  TaskLog.paginate(filters, { ...pagingOptions, populate: 'sinhVien deTai', sort: { logDate: -1 } })
    .then((taskLogs) => {
      res.status(200).json(taskLogs);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getTaskLogById = (req, res) => {
  TaskLog.findOne({ _id: req.params.id })
    .then((taskLog) => {
      res.status(201).json(taskLog);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createTaskLog = (req, res) => {
  const taskLog = req.body;
  DeTai.findOne({ sinhVienThucHien: taskLog.sinhVien })
    .then((deTai) => {
      var newTaskLog = new TaskLog({ ...taskLog, deTai: deTai._id });
      newTaskLog.save()
        .then(() => {
          res.status(201).json(newTaskLog);
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updateTaskLogById = (req, res) => {
  const taskLog = req.body;
  const id = req.params.id;

  TaskLog.updateOne({ _id: id }, taskLog)
    .then(() => {
      res.status(201).json(taskLog);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteTaskLog = (req, res) => {
  TaskLog.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}