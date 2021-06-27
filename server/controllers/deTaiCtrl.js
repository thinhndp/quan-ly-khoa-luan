import { OAuth2Client } from 'google-auth-library';
import DeTai from '../models/DeTai.js';
import SinhVien from '../models/SinhVien.js';
import GiangVien from '../models/GiangVien.js';
import User from '../models/User.js';
import KyThucHien from '../models/KyThucHien.js';
import * as Utils from '../utils/utils.js';

const CLIENT_ID = process.env.GOOGLE_DRIVE_CLIENT_ID;

const client = new OAuth2Client(CLIENT_ID);

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
    tenDeTai: '',
    giangVien: '',
    trangThaiDuyet: '',
    trangThaiThucHien: '',
    heDaoTao: '',
    diemSo: { $gte: '0', $lte: '10' },
    sinhVienThucHien: '',
    kyThucHien: '',
    moTa: '',
  }
  rawFilters = { ...rawFilters, ...queryFilters };

  Promise.all([
    GiangVien.find({ name: Utils.getIncludeFilter(rawFilters.giangVien) }),
    SinhVien.find({ name: Utils.getIncludeFilter(rawFilters.sinhVienThucHien) }),
    KyThucHien.find({ name: Utils.getIncludeFilter(rawFilters.kyThucHien), }),
  ]).then((resList) => {
    const giangVienIds = resList[0].map(gv => gv._id);
    const sinhVienIds = resList[1].map(sv => sv._id);
    const kyThucHienIds = resList[2].map(kth => kth._id);

    var filters = {
      tenDeTai: rawFilters.tenDeTai == '' ? Utils.getIncludeFilter(search) : Utils.getIncludeFilter(rawFilters.tenDeTai),
      giangVien: { $in: giangVienIds },
      trangThaiDuyet: Utils.getIncludeFilter(rawFilters.trangThaiDuyet),
      trangThaiThucHien: Utils.getIncludeFilter(rawFilters.trangThaiThucHien),
      heDaoTao: Utils.getIncludeFilter(rawFilters.heDaoTao),
      diemSo: { $gte: '0', $lte: '10' },
      sinhVienThucHien: { $in: sinhVienIds },
      kyThucHien: { $in: kyThucHienIds },
      moTa: Utils.getIncludeFilter(rawFilters.moTa),
    };

    if (rawFilters.sinhVienThucHien == '') {
      delete filters.sinhVienThucHien;
    }

    DeTai.paginate(filters, {
      ...pagingOptions,
      populate: 'giangVien sinhVienThucHien kyThucHien',
    }).then((deTais) => {
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
      });
  })
}

export const getDeTaiById = (req, res) => {
  const { id } = req.params;
  DeTai.findOne({ _id: id }).populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien')
    .then((deTai) => {
      res.status(200).json(deTai);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const getDeTaiBySinhVienId = (req, res) => {
  const { id } = req.params;
  DeTai.findOne({ sinhVienThucHien: id, trangThaiThucHien: { $in: [ 'CDK', 'DTH' ] } }).populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien')
    .then((deTai) => {
      res.status(200).json(deTai);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    })
}

export const getDeTaisByKTHId = async (req, res) => {
  const { id } = req.params;
  try {
    let deTais = await DeTai.find({ kyThucHien: id }).populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien');
    // deTais = deTais.sort
    res.status(200).json(deTais);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const updateDeTaiById = (req, res) => {
  console.log('updateDeTaiById');
  const { id } = req.params;
  const { token, deTai } = req.body;

  console.log(token);

  client.verifyIdToken({
    idToken: token,
    audience: CLIENT_ID
  }).then((ticket) => {
    const userInfo = ticket.getPayload();
    console.log('**userInfo**');
    console.log(userInfo);
    User.findOne({ email: userInfo.email })
      .then((user) => {
        DeTai.findOne({ _id: id })
          .then((resDeTai) => {
            console.log('**user**');
            console.log(user);
            if (resDeTai.trangThaiDuyet != deTai.trangThaiDuyet && !user.canApprove) {
              res.status(400).json({ message: 'User hiện tại không có quyền duyệt' });
            }
            console.log('11');
            var newDeTai = new DeTai(deTai);
            newDeTai.isNew = false;
            newDeTai.save()
              .then((savedDetai) => {
                res.status(200).json(savedDetai);
              })
          })
          .catch((err) => {
            res.status(400).json({ message: err.message });
          })
      })
      .catch((err) => {
        res.status(400).json({ message: err.message });
      })
  }).catch((err) => {
    res.status(400).json({ message: err.message });
  });

/*   DeTai.findOneAndReplace({ _id: id }, deTai)
    .then(() => {
      res.status(200).json(deTai);
    })
    .catch((err) => {
      res.status(400).json({ message: err.message });
    }) */
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