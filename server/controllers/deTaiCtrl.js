import DeTai from '../models/DeTai.js';
import SinhVien from '../models/SinhVien.js';

export const getDeTais = (req, res) => {
  console.log('getDeTais');
  DeTai.find().populate('giangVien').populate('sinhVienThucHien')
    .then((deTais) => {
      res.status(200).json(deTais);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const getDeTaiById = (req, res) => {
  console.log('getDeTaiById');
  const { id } = req.params;
  DeTai.findOne({ _id: id }).populate('giangVien').populate('sinhVienThucHien')
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