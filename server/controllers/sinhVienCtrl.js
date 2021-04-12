import SinhVien from '../models/SinhVien.js';

export const getSinhViens = (req, res) => {
  SinhVien.find()
    .then((sinhViens) => {
      res.status(200).json(sinhViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const createSinhVien = (req, res) => {
  const sinhVien = req.body;
  const newSinhVien = new SinhVien(sinhVien);

  newSinhVien.save()
    .then(() => {
      res.status(201).json(newSinhVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const createManySinhViens = (req, res) => {
  const sinhViens = req.body;
  SinhVien.insertMany(sinhViens)
    .then(() => {
      res.status(201).json(sinhViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}