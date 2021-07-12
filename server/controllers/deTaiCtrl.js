import { OAuth2Client } from 'google-auth-library';
import DeTai from '../models/DeTai.js';
import SinhVien from '../models/SinhVien.js';
import GiangVien from '../models/GiangVien.js';
import User from '../models/User.js';
import KyThucHien from '../models/KyThucHien.js';
import HoiDong from '../models/HoiDong.js';
import SystemSetting from '../models/SystemSetting.js';
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

export const getDeTaisWithPendingApproval = async (req, res) => {
  // Search and Paging
  const { search, pagingOptions } = req.body;

  try {
    let curKTH = await KyThucHien.findOne({ status: 'DDR' });

    if (!curKTH) {
      res.status(200).json([]);
    }

    var filters = {
      tenDeTai: Utils.getIncludeFilter(search),
      'xacNhanGiuaKi.pending': true,
      kyThucHien: curKTH._id
    };

    let deTais = await DeTai.paginate(filters, {
      ...pagingOptions,
      populate: 'giangVien sinhVienThucHien kyThucHien ',
    });
    res.status(200).json(deTais);
  }
  catch(err) {
    res.status(400).json({ message: err.message });
  }
}

export const getCurrrentKTHDeTaisByGiangVien = async (req, res) => {
  const { id } = req.params;
  try {
    let curKTH = await KyThucHien.findOne({ status: 'DDR' });
    console.log(curKTH);
    let deTais = await DeTai.find({ kyThucHien: curKTH._id, giangVien: id }).populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien');
    console.log(deTais);
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
    })
    res.status(200).json(deTais);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const getDeTaisWithHoiDong = async (req, res) => {
  try {
    let hoiDongs = await HoiDong.find()
      .populate({ path: 'deTais', populate: [{ path: 'sinhVienThucHien', model: 'SinhVien' }, { path: 'giangVien', model: 'GiangVien' }] }).populate('canBoPhanBien')
      .populate('canBoHuongDan').populate('chuTich').populate('thuKy')
      .populate('uyVien')
    var deTais = [];
    for (var hoiDong of hoiDongs) {
      if (hoiDong.deTais) {
        for (var deTai of hoiDong.deTais) {
          var newDeTai = deTai;
          var newDeTai = {
            ...JSON.parse(JSON.stringify(deTai)),
            hoiDong: hoiDong,
            canBoPhanBien: hoiDong.canBoPhanBien,
            chuTich: hoiDong.chuTich,
            thuKy: hoiDong.thuKy,
            uyVien: hoiDong.uyVien,
          }
          console.log(newDeTai);
          deTais.push(newDeTai);
        }
      }
    }
    // console.log(deTais);
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

export const createManyDeTais = async (req, res) => {
  const deTais = req.body;
  try {
    const sysSetting = await SystemSetting.find();
    console.log(sysSetting);
    if (sysSetting == null || sysSetting.length == 0 || sysSetting[0].deXuatToiDa == null) {
      res.status(400).json({ message: 'Chưa thiết lập số lượng đề xuất tối đa' });
      return;
    }
    const deTaiOfGV = await DeTai.find({ giangVien: deTais[0].giangVien });
    if (deTaiOfGV.length + deTais.length > sysSetting[0].deXuatToiDa) {
      res.status(400).json({ message: 'Quá số lượng đề xuất tối đa' });
      return;
    }
    await DeTai.insertMany(deTais);
    res.status(201).json(deTais);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
}

export const deleteDeTaiById = async (req, res) => {
  const { id } = req.params;
  console.log('deleteDeTaiById');
  const deTai = await DeTai.findOne({ _id: id });
  if (deTai.sinhVienThucHien.length > 0) {
    res.status(400).json({ message: 'Đề tài đã có Sinh viên đăng ký.' });
    return;
  }
  try {
    await DeTai.deleteOne({ _id: id });
    res.status(201).json(req.params.id);
  }
  catch (err) {
    res.status(400).json({ message: err.message });
  }
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

export const continueApprove = async (req, res) => {
  const { id, sv } = req.params;
  const { tiepTuc, lyDoDung } = req.body;
  console.log(sv);
  try {
    if (sv == '2') {
      await DeTai.findByIdAndUpdate(id,
        { $set: { 'xacNhanGiuaKi.sinhVien2.tiepTuc': tiepTuc,
          'xacNhanGiuaKi.sinhVien2.lyDoDung': lyDoDung,
          'xacNhanGiuaKi.pending': true } });
    }
    else {
      await DeTai.findByIdAndUpdate(id,
        { $set: { 'xacNhanGiuaKi.sinhVien1.tiepTuc': tiepTuc,
          'xacNhanGiuaKi.sinhVien1.lyDoDung': lyDoDung,
          'xacNhanGiuaKi.pending': true } });
    } 
    res.status(201).json(req.body);
  }
  catch(err) {
    res.status(400).json({ message: err.message });
  }
}

export const updateNameChange = async (req, res) => {
  const changeList = req.body;
  console.log(changeList);
  try {
    // if (sv == '2') {
    //   await DeTai.findByIdAndUpdate(id,
    //     { $set: { 'xacNhanGiuaKi.sinhVien2.tiepTuc': tiepTuc,
    //       'xacNhanGiuaKi.sinhVien2.lyDoDung': lyDoDung,
    //       'xacNhanGiuaKi.pending': true } });
    // }
    // else {
    //   await DeTai.findByIdAndUpdate(id,
    //     { $set: { 'xacNhanGiuaKi.sinhVien1.tiepTuc': tiepTuc,
    //       'xacNhanGiuaKi.sinhVien1.lyDoDung': lyDoDung,
    //       'xacNhanGiuaKi.pending': true } });
    // }
    var listMSSV = changeList.map((change) => change.maSV);
    let sinhViens = await SinhVien.find({ maSV: { $in: listMSSV } });
    var listSVId = sinhViens.map((sv) => sv._id);
    let deTais = await DeTai.find({ 'sinhVienThucHien': { $in: listSVId } })
        .populate('giangVien').populate('sinhVienThucHien').populate('kyThucHien');
    let deTaisToUpdate = [];
    for (let change of changeList) {
      let deTai = deTais.filter((dt) => {
        let listMaSVOfDeTai = dt.sinhVienThucHien.map((sv) => sv.maSV);
        return listMaSVOfDeTai.includes(change.maSV);
      })[0];
      deTai.xacNhanGiuaKi.thayDoiTen = true;
      deTai.xacNhanGiuaKi.newName = change.tenTVMoi;
      deTai.xacNhanGiuaKi.newEnglishName = change.tenTAMoi;
      deTai.xacNhanGiuaKi.lyDoDoiTen = change.lyDo;
      deTai.xacNhanGiuaKi.pending = true;
      deTaisToUpdate.push(deTai);
    }

    const config = { matchFields: ['_id'] };
    await DeTai.upsertMany(deTaisToUpdate, config)
    res.status(201).json(deTaisToUpdate);
  }
  catch(err) {
    res.status(400).json({ message: err.message });
  }
}
