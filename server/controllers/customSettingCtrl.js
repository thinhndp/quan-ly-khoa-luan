import CustomSetting from '../models/CustomSetting.js';

export const getCustomSettingByName = (req, res) => {
  const name = req.body;
  CustomSetting.find({ name: name })
    .then((customSetting) => {
      res.status(200).json(customSetting);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updateCustomSettingByName = (req, res) => {
  const { name, values } = req.body;
  const uniqueValues = values.filter((v, i, a) => a.indexOf(v) === i);
  uniqueValues.sort();

  CustomSetting.updateOne({ name: name }, uniqueValues)
    .then((newCusSetting) => {
      res.status(201).json(newCusSetting);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};
