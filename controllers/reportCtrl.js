import TaskLog from '../models/TaskLog.js';
import KyThucHien from '../models/KyThucHien.js';
import DeTai from '../models/DeTai.js';
import * as Utils from '../utils/utils.js';

export const getTaskLogReportBySVId = async (req, res) => {
  const { id } = req.params;
  try {
    const taskLogs = await TaskLog.find({ sinhVien: id }).populate({ path: 'deTai', populate: { path: 'kyThucHien', model: 'KyThucHien' } });
    if (taskLogs.length > 0) {
      const deTaiId = taskLogs[0].deTai;
      const deTai = await DeTai.findOne({ _id: deTaiId }).populate('kyThucHien');
      var dateLogMap = new Map();
      for (var taskLog of taskLogs) {
        var logDate = Utils.getDateString(taskLog.logDate.toLocaleDateString());
        if (dateLogMap.has(logDate)) {
          var logOnDate = dateLogMap.get(logDate);
          dateLogMap.set(logDate, [ ...logOnDate, taskLog ]);
        }
        else {
          dateLogMap.set(logDate, [ taskLog ]);
        }
      }
      var firstReportDay = Utils.getLastMonday(deTai.kyThucHien.startDate);
      var lastReportDay = Utils.getNextSunday(deTai.kyThucHien.endDate);
      var numOfDays = Utils.getDaysBetween(firstReportDay, lastReportDay);
      var resReport = {};
      for (var i = 0; i <= numOfDays; i++) {
        var dayStr = Utils.getDateString(Utils.addDays(firstReportDay, i).toLocaleDateString());
        console.log(dayStr);
        if (!dateLogMap.has(dayStr)) {
          resReport[dayStr] = [];
        }
        else {
          resReport[dayStr] = dateLogMap.get(dayStr);

        }
      }
      console.log(resReport);
      res.status(200).json(resReport);
    }
    else {
      res.status(200).json({});
    }
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
};