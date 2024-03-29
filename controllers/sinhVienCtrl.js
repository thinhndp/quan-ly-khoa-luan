import SinhVien from '../models/SinhVien.js';
import DeTai from '../models/DeTai.js';
import User from '../models/User.js';
import * as Utils from '../utils/utils.js';

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
  // Search and Paging
  const { search, pagingOptions } = req.body;
  const searchRegex = new RegExp("^.*" + search + ".*");

  // Filters
  const reqQuery = { ...req.query };
  const removeFields = [ "sort" ];
  removeFields.forEach((val) => delete reqQuery[val]);
  let queryStr = JSON.stringify(reqQuery);
  queryStr = Utils.getConvertedQueryString(queryStr);

  const queryFilters = JSON.parse(queryStr);
  var rawFilters = {
    maSV: '',
    lopSH: '',
    name: '',
    phone: '',
    email: '',
    status: '',
    diemTB: { $gte: '0', $lte: '10' },
  }
  rawFilters = { ...rawFilters, ...queryFilters };
  const filters = {
    maSV: Utils.getIncludeFilter(rawFilters.maSV),
    lopSH: Utils.getIncludeFilter(rawFilters.lopSH),
    name: rawFilters.name == '' ? Utils.getIncludeFilter(search) : Utils.getIncludeFilter(rawFilters.name),
    phone: Utils.getIncludeFilter(rawFilters.phone),
    email: Utils.getIncludeFilter(rawFilters.email),
    status: Utils.getIncludeFilter(rawFilters.status),
    diemTB: rawFilters.diemTB,
  };
  console.log(filters);

  SinhVien.paginate(filters, { 
    ...pagingOptions,
    sort: { updatedAt: -1 }
  })
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
  console.log(sinhViens);
  let sinhViensToUpsert = sinhViens.map(sv => {
    if (!sv.status) {
      return { ...sv, status: 'CDK' };
    }
    return sv;
  })
  SinhVien.upsertMany(sinhViensToUpsert, config)
    .then(() => {
      res.status(201).json(sinhViensToUpsert);
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

export const deleteSinhVienById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ relatedInfoSV: id });
    if (user != null) {
      res.status(400).json({ message: 'Đã có User liên kết với Sinh viên này' });
      return;
    }
    await SinhVien.deleteOne({ _id: req.params.id });
    res.status(201).json(req.params.id);
  } catch (error) {
    res.status(400).json({ message: err.message });
  }
/*   SinhVien.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    }); */
}