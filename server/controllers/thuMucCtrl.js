import ThuMuc from '../models/ThuMuc.js';
import FileNop from '../models/FileNop.js';

export const getThuMucs = (req, res) => {
  ThuMuc.find()
    .then((thuMucs) => {
      res.status(200).json(thuMucs);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getThuMucById = (req, res) => {
  ThuMuc.findOne({ _id: req.params.id })
    .then((thuMuc) => {
      res.status(201).json(thuMuc);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createThuMuc = (req, res) => {
  const thuMuc = req.body;
  const newThuMuc = new ThuMuc(thuMuc);

  newThuMuc.save()
    .then(() => {
      res.status(201).json(newThuMuc);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updateThuMucById = (req, res) => {
  const thuMuc = req.body;
  const id = req.params.id;

  ThuMuc.updateOne({ _id: id }, thuMuc)
    .then(() => {
      res.status(201).json(thuMuc);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteThuMuc = (req, res) => {
  ThuMuc.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}