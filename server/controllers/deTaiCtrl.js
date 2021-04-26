import DeTai from '../models/DeTai.js';

export const getDeTais = (req, res) => {
  DeTai.find()
    .then((deTais) => {
      res.status(200).json(deTais);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const createManyDeTais = (req, res) => {
  const deTais = req.body;
  console.log(deTais);
  DeTai.insertMany(deTais)
    .then(() => {
      res.status(201).json(deTais);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}