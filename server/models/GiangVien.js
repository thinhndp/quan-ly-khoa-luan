import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';

const giangVienSchema = mongoose.Schema({
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

giangVienSchema.plugin(upsertMany);

const GiangVien = mongoose.model('GiangVien', giangVienSchema, 'GiangVien');

export default GiangVien;