import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';

const sinhVienSchema = mongoose.Schema({
  maSV: String,
  lopSH: String,
  name: String,
  // image: String,
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

sinhVienSchema.plugin(upsertMany);

const SinhVien = mongoose.model('SinhVien', sinhVienSchema, 'SinhVien');

export default SinhVien;