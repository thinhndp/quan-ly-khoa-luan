import PhongHoc from '../models/PhongHoc.js';
import HoiDong from '../models/HoiDong.js';
import * as Utils from '../utils/utils.js';

export const getPhongHocs = (req, res) => {
  PhongHoc.find()
    .then((phongHocs) => {
      res.status(200).json(phongHocs);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getPhongHocsWithQuery = (req, res) => {
  // Search and Paging
  const { search, pagingOptions } = req.body;

  // Filters
  const reqQuery = { ...req.query };
  const removeFields = [ "sort" ];
  removeFields.forEach((val) => delete reqQuery[val]);
  let queryStr = JSON.stringify(reqQuery);
  queryStr = Utils.getConvertedQueryString(queryStr);

  const queryFilters = JSON.parse(queryStr);
  var rawFilters = {
    name: '',
  }
  rawFilters = { ...rawFilters, ...queryFilters };
  var filters = {
    name: rawFilters.name == '' ? Utils.getIncludeFilter(search) : Utils.getIncludeFilter(rawFilters.name),
  };

  PhongHoc.paginate(filters, {
    ...pagingOptions,
    sort: { updatedAt: -1 }
  }).then((phongHocs) => {
      res.status(200).json(phongHocs);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

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

export const deletePhongHoc = async(req, res) => {
  try {
    let { id } = req.params;
    const hoiDong = await HoiDong.find({ phongHoc: id });
    if (hoiDong.length > 0) {
      res.status(400).json({ message: 'Đã tồn tại Hội đồng dùng phòng học này' });
      return;
    }
    await PhongHoc.deleteOne({ _id: id });
    res.status(201).json(id);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}