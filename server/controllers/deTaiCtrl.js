import DeTai from '../models/DeTai';

export const getDeTais = (req, res) => {
  DeTai.find()
    .then((deTais) => {
      res.status(200).json(giangViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const createManyDeTais = (req, res) => {
  const deTais = req.body;
  DeTai.insertMany(deTais)
    .then(() => {
      res.status(201).json(giangViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}