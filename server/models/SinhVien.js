import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';

export const SinhVienSchema = mongoose.Schema({
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

SinhVienSchema.plugin(upsertMany);

const SinhVien = mongoose.model('SinhVien', SinhVienSchema, 'SinhVien');

export default SinhVien;