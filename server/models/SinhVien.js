import mongoose from 'mongoose';

const sinhVienSchema = mongoose.Schema({
  maSV: String,
  lopSH: String,
  name: String,
  image: String,
  phone: String,
  email: String,
  status: {
    type: String,
    default: 'IP'
  },
  diemTB: {
    type: Number,
    default: 0
  }
});

const SinhVien = mongoose.model('SinhVien', sinhVienSchema, 'SinhVien');

export default SinhVien;