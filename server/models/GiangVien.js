import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';

export const GiangVienSchema = mongoose.Schema({
  maGV: String,
  name: String,
  hocHam: String,
  phone: String,
  email: String,
  huongNghienCuu: String
});

GiangVienSchema.plugin(upsertMany);

const GiangVien = mongoose.model('GiangVien', GiangVienSchema, 'GiangVien');

export default GiangVien;