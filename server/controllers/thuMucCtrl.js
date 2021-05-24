import ThuMuc from '../models/ThuMuc.js';
import FileNop from '../models/FileNop.js';

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
      res.status(201).json(thuMuc.files);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createFilesInFolder = (req, res) => {
  const id = req.params.id;
  const files = req.body;
  ThuMuc.findById(id)
    .then((thuMuc) => {
      for (let file of files) {
        thuMuc.files.push(file);
      }
      console.log('@tmmm');
      console.log(thuMuc);
      thuMuc.save()
        .then((saveRes) => {
          res.status(201).json(saveRes);
        })
        // .catch((err) => {
        //   res.status(400).json({ message: err.message });
        // });
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}