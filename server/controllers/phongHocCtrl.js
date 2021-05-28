import PhongHoc from '../models/PhongHoc.js';

export const getPhongHocs = (req, res) => {
  PhongHoc.find()
    .then((phongHocs) => {
      res.status(200).json(phongHocs);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getPhongHocById = (req, res) => {
  PhongHoc.findOne({ _id: req.params.id })
    .then((phongHoc) => {
      res.status(201).json(phongHoc);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createPhongHoc = (req, res) => {
  const phongHoc = req.body;
  const newPhongHoc = new PhongHoc(phongHoc);

  newPhongHoc.save()
    .then(() => {
      res.status(201).json(newPhongHoc);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updatePhongHocById = (req, res) => {
  const phongHoc = req.body;
  const id = req.params.id;

  PhongHoc.updateOne({ _id: id }, phongHoc)
    .then(() => {
      res.status(201).json(phongHoc);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deletePhongHoc = (req, res) => {
  PhongHoc.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}