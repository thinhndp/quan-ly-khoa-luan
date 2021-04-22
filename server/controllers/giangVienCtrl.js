import GiangVien from '../models/GiangVien.js';

export const getGiangViens = (req, res) => {
  GiangVien.find()
    .then((giangViens) => {
      res.status(200).json(giangViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const getGiangVienById = (req, res) => {
  GiangVien.findOne({ _id: req.params.id })
    .then((giangVien) => {
      res.status(201).json(giangVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createGiangVien = (req, res) => {
  const giangVien = req.body;
  const newGiangVien = new GiangVien(giangVien);

  newGiangVien.save()
    .then(() => {
      res.status(201).json(newGiangVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const createManyGiangViens = (req, res) => {
  const giangViens = req.body;
  GiangVien.insertMany(giangViens)
    .then(() => {
      res.status(201).json(giangViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const upsertManyGiangViens = (req, res) => {
  const giangViens = req.body;
  const config = { matchFields: ['maGV'] };
  GiangVien.upsertMany(giangViens, config)
    .then(() => {
      res.status(201).json(giangViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const updateGiangVienById = (req, res) => {
  const giangVien = req.body;
  const id = req.params.id;
  GiangVien.findByIdAndUpdate({ _id: id }, giangVien)
    .then(() => {
      res.status(201).json(giangVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteGiangVienById = (req, res) => {
  GiangVien.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}