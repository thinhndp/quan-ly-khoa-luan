import SystemSetting from '../models/SystemSetting.js';

export const getSystemSetting = (req, res) => {
  SystemSetting.find()
    .then((systemSettings) => {
      res.status(200).json(systemSettings);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updateSystemSetting = (req, res) => {
  const sysSetting = req.body;

  SystemSetting.updateOne({ instance: sysSetting.instance }, sysSetting)
    .then((newSysSetting) => {
      res.status(201).json(newSysSetting);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
