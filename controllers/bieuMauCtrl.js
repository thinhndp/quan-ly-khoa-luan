import BieuMau from '../models/BieuMau.js';
import * as Utils from '../utils/utils.js';

export const getBieuMaus = (req, res) => {
  BieuMau.find()
    .then((bieuMaus) => {
      res.status(200).json(bieuMaus);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getBieuMausWithQuery = (req, res) => {
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
    link: '',
  }
  rawFilters = { ...rawFilters, ...queryFilters };
  var filters = {
    name: rawFilters.name == '' ? Utils.getIncludeFilter(search) : Utils.getIncludeFilter(rawFilters.name),
    link: Utils.getIncludeFilter(rawFilters.link),
  };
  console.log(filters);

  BieuMau.paginate(filters, {
    ...pagingOptions,
  }).then((bieuMaus) => {
      res.status(200).json(bieuMaus);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

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

  var updatedBieuMau = new BieuMau(bieuMau);
  updatedBieuMau.isNew = false;
  // BieuMau.updateOne({ _id: id }, bieuMau)
  updatedBieuMau.save()
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