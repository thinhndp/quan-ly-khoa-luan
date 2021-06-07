import KyThucHien from '../models/KyThucHien.js';

export const getKyThucHiens = (req, res) => {
  KyThucHien.find()
    .then((kyThucHiens) => {
      res.status(200).json(kyThucHiens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getKyThucHienById = (req, res) => {
  KyThucHien.findOne({ _id: req.params.id })
    .then((kyThucHien) => {
      res.status(201).json(kyThucHien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createKyThucHien = (req, res) => {
  const kyThucHien = req.body;
  const newKyThucHien = new KyThucHien(kyThucHien);

  newKyThucHien.save()
    .then(() => {
      res.status(201).json(newKyThucHien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updateKyThucHienById = (req, res) => {
  const kyThucHien = req.body;
  const id = req.params.id;

  KyThucHien.updateOne({ _id: id }, kyThucHien)
    .then(() => {
      res.status(201).json(kyThucHien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteKyThucHien = (req, res) => {
  KyThucHien.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}