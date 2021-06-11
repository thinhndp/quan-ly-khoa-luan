import GiangVien from '../models/GiangVien.js';
import DeTai from '../models/DeTai.js';

export const getGiangViens = (req, res) => {
  GiangVien.find()
    .then((giangViens) => {
      res.status(200).json(giangViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const getGiangViensWithQuery = (req, res) => {
  console.log('pagingOptions');
  console.log(req.body);
  const { pagingOptions } = req.body;
  console.log(pagingOptions);
  GiangVien.paginate({}, pagingOptions)
    .then((giangViens) => {
      console.log(giangViens);
      res.status(200).json(giangViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const getGiangVienById = (req, res) => {
  GiangVien.findOne({ _id: req.params.id })
    .then((giangVien) => {
      res.status(201).json(giangVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}
export const getGiangVienByEmail = (req, res) => {
  const { email } = req.body;
  console.log('email');
  console.log(email);
  GiangVien.findOne({ email: email })
    .then((giangVien) => {
      res.status(200).json(giangVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const createGiangVien = (req, res) => {
  const giangVien = req.body;
  const newGiangVien = new GiangVien(giangVien);

  newGiangVien.save()
    .then(() => {
      res.status(201).json(newGiangVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const createManyGiangViens = (req, res) => {
  const giangViens = req.body;
  GiangVien.insertMany(giangViens)
    .then(() => {
      res.status(201).json(giangViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const upsertManyGiangViens = (req, res) => {
  const giangViens = req.body;
  const config = { matchFields: ['maGV'] };
  const giangVienPromise = GiangVien.upsertMany(giangViens, config);
  
  let giangViensMap = new Map();
  let maGVs = [];
  giangViens.forEach((gv, index) => {
    giangViensMap.set(gv.maGV, gv);
    maGVs.push(gv.maGV);
  });
  console.log('map');
  console.log(giangViensMap);

  const deTaiPromise = DeTai.find({ 'giangVien.maGV': { $in: maGVs } })
    .then((deTais) => {
      let bulkArr = [];
      for (let deTai of deTais) {
        bulkArr.push({
          updateOne: {
            "filter": { "_id": deTai._id },
            "update": { $set: { "giangVien": giangViensMap.get(deTai.giangVien.maGV) } }
          }
        });
      }
      DeTai.bulkWrite(bulkArr);
    });
  
  Promise.all([ giangVienPromise, deTaiPromise ])
    .then(() => {
      console.log('promise');
      res.status(201).json(giangViens);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const updateGiangVienById = (req, res) => {
  const giangVien = req.body;
  const id = req.params.id;
  const giangVienPromise = GiangVien.findByIdAndUpdate({ _id: id }, giangVien);

  console.log(id);
  console.log(giangVien);

  const deTaiPromise = DeTai.updateMany(
    { "giangVien._id": id },
    { $set: { "giangVien": giangVien } }
  );

  Promise.all([ giangVienPromise, deTaiPromise ])
    .then(() => {
      res.status(201).json(giangVien);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const deleteGiangVienById = (req, res) => {
  GiangVien.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}