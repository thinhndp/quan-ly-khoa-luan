import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';

const giangVienSchema = mongoose.Schema({
  maGV: String,
  name: String,
  hocHam: String,
  phone: String,
  email: String,
  huongNghienCuu: String
});

giangVienSchema.plugin(upsertMany);

const GiangVien = mongoose.model('GiangVien', giangVienSchema, 'GiangVien');

export default GiangVien;