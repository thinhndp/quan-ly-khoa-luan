import KyThucHien from '../models/KyThucHien.js';
import DeTai from '../models/DeTai.js';
import * as Utils from '../utils/utils.js';

export const getKyThucHiens = (req, res) => {
  KyThucHien.find()
    .then((kyThucHiens) => {
      res.status(200).json(kyThucHiens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getKyThucHiensWithQuery = (req, res) => {
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
    status: '',
    startDate: { $gte: '1970-01-01T00:00:00.000Z', $lte: '2036-12-31T23:59:59.000Z' },
    endDate: { $gte: '1970-01-01T00:00:00.000Z', $lte: '2036-12-31T23:59:59.000Z' },
  }
  rawFilters = { ...rawFilters, ...queryFilters };
  const filters = {
    name: rawFilters.name == '' ? Utils.getIncludeFilter(search) : Utils.getIncludeFilter(rawFilters.name),
    status: Utils.getIncludeFilter(rawFilters.status),
    startDate: rawFilters.startDate,
    endDate: rawFilters.endDate,
  };
  console.log(filters);

  KyThucHien.paginate(filters, pagingOptions)
    .then((kyThucHiens) => {
      res.status(200).json(kyThucHiens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getOneActiveKyThucHien = (req, res) => {
  KyThucHien.findOne({ status: 'DDR' })
    .then((kyThucHien) => {
      res.status(201).json(kyThucHien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

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

  if (kyThucHien.status == 'DDR') {
    KyThucHien.findOne({ status: 'DDR' })
      .then((activeKTH) => {
        if (activeKTH != null && (activeKTH._id != kyThucHien._id)) {
          var msg = 'Không thể có 2 Kỳ thực hiện Khóa luận diễn ra cùng lúc';
          console.log(msg);
          res.status(400).json({ message: msg });
        }
        else {
          KyThucHien.updateOne({ _id: id }, kyThucHien)
            .then(() => {
              res.status(201).json(kyThucHien);
            })
            .catch((err) => {
              console.log(err);
              res.status(400).json({ message: err.message });
            });
        }
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err.message });
      });
  }
  else {
    KyThucHien.updateOne({ _id: id }, kyThucHien)
      .then(() => {
        res.status(201).json(kyThucHien);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json({ message: err.message });
      });
  }
}

export const deleteKyThucHien = async (req, res) => {
  const { id } = req.params;
  const deTais = await DeTai.find({ kyThucHien: id });
  if (deTais.length > 0) {
    res.status(400).json({ message: 'Kỳ thực hiện đã tồn tại Đề tài' });
    return;
  }
  try {
    await KyThucHien.deleteOne({ _id: req.params.id });
    res.status(201).json(req.params.id);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}