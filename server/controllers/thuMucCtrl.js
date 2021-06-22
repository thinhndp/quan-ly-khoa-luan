import mongoose from 'mongoose';
import ThuMuc from '../models/ThuMuc.js';
import FileNop from '../models/FileNop.js';
import User from '../models/User.js';

export const getThuMucs = (req, res) => {
  ThuMuc.find()
    .then((thuMucs) => {
      let bulkArr = [];
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
      ThuMuc.bulkWrite(bulkArr);
      res.status(200).json(returnedThuMucs);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
};

export const getThuMucsWithQuery = (req, res) => {
  const { search, pagingOptions } = req.body;
  const searchRegex = new RegExp("^.*" + search + ".*");
  ThuMuc.paginate({ name: { $regex: searchRegex, $options: "i" } }, pagingOptions)
    .then((pageData) => {
      let thuMucs = pageData.docs;
      let bulkArr = [];
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
      ThuMuc.bulkWrite(bulkArr);
      // res.status(200).json(returnedThuMucs);
      res.status(200).json({ ...pageData, docs: returnedThuMucs});
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
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
    // .catch((err) => {
    //   res.status(400).json({ message: err.message });
    // });
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