import BieuMau from '../models/BieuMau.js';

export const getBieuMaus = (req, res) => {
  BieuMau.find()
    .then((bieuMaus) => {
      res.status(200).json(bieuMaus);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getBieuMauById = (req, res) => {
  BieuMau.findOne({ _id: req.params.id })
    .then((bieuMau) => {
      res.status(201).json(bieuMau);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createBieuMau = (req, res) => {
  const bieuMau = req.body;
  const newBieuMau = new BieuMau(bieuMau);

  newBieuMau.save()
    .then(() => {
      res.status(201).json(newBieuMau);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const updateBieuMauById = (req, res) => {
  const bieuMau = req.body;
  const id = req.params.id;

  BieuMau.updateOne({ _id: id }, bieuMau)
    .then(() => {
      res.status(201).json(bieuMau);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteBieuMau = (req, res) => {
  BieuMau.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}