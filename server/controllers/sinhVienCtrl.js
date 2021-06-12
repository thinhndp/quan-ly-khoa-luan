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

export const getSinhViensWithQuery = (req, res) => {
  const { search, pagingOptions } = req.body;
  const searchRegex = new RegExp("^.*" + search + ".*");
  SinhVien.paginate({ name: { $regex: searchRegex, $options: "i" } }, pagingOptions)
    .then((sinhViens) => {
      res.status(200).json(sinhViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const getSinhVienById = (req, res) => {
  SinhVien.findOne({ _id: req.params.id })
    .then((sinhVien) => {
      res.status(201).json(sinhVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
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

export const upsertManySinhViens = (req, res) => {
  const sinhViens = req.body;
  const config = { matchFields: ['maSV'] };
  SinhVien.upsertMany(sinhViens, config)
    .then(() => {
      res.status(201).json(sinhViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const updateSinhVienById = (req, res) => {
  const sinhVien = req.body;
  const id = req.params.id;
  SinhVien.findByIdAndUpdate({ _id: id }, sinhVien)
    .then(() => {
      res.status(201).json(sinhVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteSinhVienById = (req, res) => {
  SinhVien.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}