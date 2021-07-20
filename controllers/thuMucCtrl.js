import mongoose from 'mongoose';
import ThuMuc from '../models/ThuMuc.js';
import FileNop from '../models/FileNop.js';
import User from '../models/User.js';
import KyThucHien from '../models/KyThucHien.js';
import * as Utils from '../utils/utils.js';

export const getThuMucs = (req, res) => {
  ThuMuc.find().sort({ createdAt: -1 })
    .then((thuMucs) => {
      /* let bulkArr = [];
      let returnedThuMucs = [];
      for (let thuMuc of thuMucs) {
        const status = (thuMuc.deadline < Date.now()) ? 'Closed' : 'Open';
        bulkArr.push({
          updateOne: {
            "filter": { "_id": thuMuc._id },
            "update": { $set: { "status": status } }
          }
        });
        // returnedThuMucs.push({ ...thuMuc, status: status });
        let thuMucWNewStatus = thuMuc;
        thuMucWNewStatus.status = status;
        returnedThuMucs.push(thuMucWNewStatus);
      }
      ThuMuc.bulkWrite(bulkArr); */
      res.status(200).json(thuMucs);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getThuMucsWithQuery = async(req, res) => {
  try {
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
    if (rawFilters.kyThucHien != null) {
      let kyThucHien = await KyThucHien.findById(rawFilters.kyThucHien);
      if (kyThucHien != null) {
        filters.createdAt = { $gte: kyThucHien.startDate, $lte: kyThucHien.endDate }
      }
    }
    console.log(filters);

    let thuMucs = await ThuMuc.paginate(filters, {
      ...pagingOptions,
      sort: { updatedAt: -1 }
    });
    res.status(200).json(thuMucs);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const getThuMucById = (req, res) => {
  ThuMuc.findOne({ _id: req.params.id })
    .then((thuMuc) => {
      const status = (thuMuc.deadline < Date.now()) ? 'Closed' : 'Open';
      const returnedThuMuc = thuMuc;
      returnedThuMuc.status = status;
      returnedThuMuc.save()
        .then((resThuMuc) => {
          res.status(201).json(resThuMuc);
        });
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
  /* if (!thuMuc.name || thuMuc.name.length < 1) {
    res.status(400).json({ message: 'Xin hãy nhập tên thư mục' });
  } */
  // ThuMuc.updateOne({ _id: id }, thuMuc)
  var updatedThuMuc = new ThuMuc(thuMuc);
  updatedThuMuc.isNew = false;
  updatedThuMuc.save()
    .then(() => {
      res.status(201).json(thuMuc);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteThuMuc = async(req, res) => {
  try {
    const { id } = req.params;
    const thuMuc = await ThuMuc.findById(id);
    if (thuMuc.files != null && thuMuc.files.length > 0) {
      res.status(400).json({ message: 'Thư mục đã tồn tại file' });
      return;
    }
    await ThuMuc.deleteOne({ _id: req.params.id });
    res.status(201).json(req.params.id);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const getFilesOfFolder = (req, res) => {
  const id = req.params.id;
  ThuMuc.findById(id)
    .then((thuMuc) => {
      console.log(thuMuc);
      res.status(201).json(thuMuc.files);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const getFilesOfFolderWithQuery = (req, res) => {
  const id = req.params.id;
  const { search, pagingOptions } = req.body;
  const searchRegex = new RegExp("^.*" + search + ".*");
  
  ThuMuc.findById(id)
    .then((thuMuc) => {
      console.log(thuMuc);
      let matchFiles = thuMuc.files.filter((tm) => (tm.name.toLowerCase().includes(search.toLowerCase())));
      let returnData = { ...pagingOptions };
      let { page, limit } = pagingOptions;
      console.log('paging options before');
      console.log(returnData);
      returnData.totalPages = Math.ceil(matchFiles.length / limit);
      // page = page <=
      returnData.thuMucName = thuMuc.name;
      returnData.docs = matchFiles.slice((page - 1) * limit, page * limit);
      returnData.totalDocs = matchFiles.length;
      returnData.pagingCounter = (page - 1) * limit + 1;
      returnData.prevPage = page - 1 > 0 ? page - 1 : null;
      returnData.nextPage = page + 1 <= returnData.totalPages ? page + 1 : null;
      returnData.hasPrevPage = returnData.prevPage != null;
      returnData.hasNextPage = returnData.nextPage != null;
      console.log('paging options after');
      console.log(returnData);
      res.status(201).json(returnData);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const getFilesBySinhVienId = async (req, res) => {
  const { id } = req.params;
  const { search, pagingOptions } = req.body;
  const searchRegex = new RegExp("^.*" + search + ".*");

  try {
    const user = await User.findOne({ relatedInfoSV: id });
    const thuMucs = await ThuMuc.find({ 'files.user.email': user.email });
    var resFiles = [];
    for (var thuMuc of thuMucs) {
      for (var file of thuMuc.files) {
        if (file.user.email == user.email) {
          var newFile = JSON.parse(JSON.stringify(file));
          newFile.thuMuc = { name: thuMuc.name, _id: thuMuc._id, driveId: thuMuc.driveId }
          console.log(newFile);
          resFiles = [ ...resFiles, newFile ];
        }
      }
    }

    // PAGINATE
      let matchFiles = resFiles.filter((f) => (f.name.toLowerCase().includes(search.toLowerCase())));
      let returnData = { ...pagingOptions };
      let { page, limit } = pagingOptions;
      returnData.totalPages = Math.ceil(matchFiles.length / limit);
      returnData.docs = matchFiles.slice((page - 1) * limit, page * limit);
      returnData.totalDocs = matchFiles.length;
      returnData.pagingCounter = (page - 1) * limit + 1;
      returnData.prevPage = page - 1 > 0 ? page - 1 : null;
      returnData.nextPage = page + 1 <= returnData.totalPages ? page + 1 : null;
      returnData.hasPrevPage = returnData.prevPage != null;
      returnData.hasNextPage = returnData.nextPage != null;
      res.status(201).json(returnData);
      
      // res.status(201).json(resFiles);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
  
}

export const createFilesInFolder = (req, res) => {
  const id = req.params.id;
  const files = req.body;
  ThuMuc.findById(id)
    .then((thuMuc) => {
      for (let file of files) {
        thuMuc.files.push(file);
      }
      thuMuc.save()
        .then((saveRes) => {
          res.status(201).json(saveRes);
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const getThuMucsByKTHId = async (req, res) => {
  const { id } = req.params;
  try {
    let kyThucHien = await KyThucHien.findById(id);
    let thuMucs = await ThuMuc.find({ createdAt: { $gte: kyThucHien.startDate, $lte: kyThucHien.endDate } });
    deTais = deTais.sort((dt1, dt2) => {
      if (dt1.trangThaiDuyet == 'CD') {
        return -1;
      }
      if (dt1.trangThaiDuyet == 'DTC') {
        return 1;
      }
      if (dt2.trangThaiDuyet == 'CD') {
        return 1;
      }
      if (dt2.trangThaiDuyet == 'DTC') {
        return -1;
      }
      return 0;
    });
    res.status(200).json(deTais);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}