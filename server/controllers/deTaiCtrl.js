import DeTai from '../models/DeTai.js';
import SinhVien from '../models/SinhVien.js';
import KyThucHien from '../models/KyThucHien.js';

export const getDeTais = (req, res) => {
  console.log('getDeTais');
  DeTai.find().populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien')
    .then((deTais) => {
      res.status(200).json(deTais);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const getDeTaisWithQuery = (req, res) => {
  // const { filter, search } = req;
  const { search, pagingOptions } = req.body;
  const searchRegex = new RegExp("^.*" + (search ? search : '') + ".*");
  const filter = {
    tenDeTai: { $regex: searchRegex, $options: "i" }
  };
  console.log(search);
  // DeTai.find({ tenDeTai: { $regex: search, $options: "i" } }).populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien')
  DeTai.paginate(filter, {
    ...pagingOptions,
    populate: 'giangVien sinhVienThucHien kyThucHien'
  }).then((deTais) => {
      // console.log('deTais');
      // console.log(deTais);
      var sortedDeTais = deTais.docs.sort((dt1, dt2) => {
        if (!dt1.kyThucHien && !dt2.kyThucHien) {
          return 0;
        }
        if (!dt1.kyThucHien) {
          return 1;
        }
        if (!dt2.kyThucHien) {
          return -1;
        }
        if (!dt1.kyThucHien.startDate && !dt2.kyThucHien.startDate) {
          return ('' + dt1.kyThucHien.name).localeCompare(dt2.kyThucHien.name);
        }
        if (!dt1.kyThucHien.startDate) {
          return 1;
        }
        if (!dt2.kyThucHien.startDate) {
          return -1;
        }
        return new Date(dt2.kyThucHien.startDate) - new Date(dt1.kyThucHien.startDate);
      })
      res.status(200).json({ ...deTais, docs: sortedDeTais});
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
  /* KyThucHien.findOne({ status: 'DDR' })
    .then((kyThucHien) => {
      var promises = [];
      if (kyThucHien != null) {
        console.log(kyThucHien._id);
        const p1 = DeTai.find({ kyThucHien: kyThucHien._id }).populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien');
        const p2 = DeTai.find({ kyThucHien: { $ne: kyThucHien._id } }).populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien');
        promises = [ p1, p2 ];
        console.log('2');
      }
      else {
        const p = DeTai.find().populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien');
        promises = [ p ];
        console.log('1');
      }
      Promise.all(promises)
        .then((results) => {
          var deTais = [];
          for (var result of results) {
            console.log(result);
            deTais = [ ...deTais, ...result ];
          }
          res.status(200).json(deTais);
        })
        .catch((err) => {
          res.status(400).json({ message: err.message });
        })
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    }); */
}

export const getDeTaiById = (req, res) => {
  console.log('getDeTaiById');
  const { id } = req.params;
  DeTai.findOne({ _id: id }).populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien')
    .then((deTai) => {
      res.status(200).json(deTai);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const updateDeTaiById = (req, res) => {
  console.log('updateDeTaiById');
  const { id } = req.params;
  const deTai = req.body;

  DeTai.findOneAndReplace({ _id: id }, deTai)
    .then(() => {
      res.status(200).json(deTai);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const createManyDeTais = (req, res) => {
  console.log('createManyDeTais');
  const deTais = req.body;
  console.log(deTais);
  DeTai.insertMany(deTais)
    .then(() => {
      res.status(201).json(deTais);
    })
    // .catch((err) => {
    //   res.status(400).json({ message: err.message });
    // })
}

export const deleteDeTaiById = (req, res) => {
  console.log('deleteDeTaiById');
  DeTai.deleteOne({ _id: req.params.id })
    .then(() => {
      res.status(201).json(req.params.id);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    });
}

export const applyForDeTai = (req, res) => {
  console.log('applyForDeTai');
  const { sinhVienId, deTaiId } = req.body;
  const dtPromise = DeTai.findOne({ _id: deTaiId });
  const svPromise = SinhVien.findOne({ _id: sinhVienId });
  Promise.all([ dtPromise, svPromise ])
    .then((prRes) => {
      let deTai = prRes[0];
      let sinhVien = prRes[1];
      console.log('alo');
      // console.log(deTai);
      // console.log(sinhVien);
      if (sinhVien != null) {
        /* if (sinhVien.status != 'CDK') {
          console.log("Sinh viên đã đăng ký");
          throw new Error("Sinh viên đã đăng ký");
        } */

        sinhVien.status = 'DTH';
        deTai.sinhVienThucHien = [ ...deTai.sinhVienThucHien, sinhVienId ];
        console.log(deTai);
        if (deTai.sinhVien1 == null) {
          deTai.sinhVien1 = sinhVien;
        }
        else if (deTai.sinhVien2 == null) {
          deTai.sinhVien2 = sinhVien;
        }
        else {
          console.log("Số lượng đăng ký vượt mức tối đa");
          throw new Error("Số lượng đăng ký vượt mức tối đa");
        }
        const svUpdatePromise = SinhVien.findByIdAndUpdate({ _id: sinhVien._id }, { status: 'DTH' });
        const dtUpdatePromise = DeTai.findByIdAndUpdate({ _id: deTai._id }, deTai);
        Promise.all([ svUpdatePromise, dtUpdatePromise ])
          .then((pr2Res) => {
            console.log('pr2Res');
            res.status(201).json(pr2Res);
          })
      }
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}