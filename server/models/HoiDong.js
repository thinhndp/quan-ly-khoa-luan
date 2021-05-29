import mongoose from 'mongoose';

const hoiDongSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phongHoc: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PhongHoc'
  },
  canBoPhanBien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiangVien'
  },
  canBoHuongDan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiangVien'
  },
  chuTich: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiangVien'
  },
  thuKy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiangVien'
  },
  uyVien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiangVien'
  },
  startAt: {
    type: Date,
    required: true,
  },
  endAt: {
    type: Date,
    required: true,
  },
  deTais: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeTai'
  }]
});

const HoiDong = mongoose.model('HoiDong', hoiDongSchema, 'HoiDong');

export default HoiDong;