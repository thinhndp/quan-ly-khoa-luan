import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';
import mongoosePaginate from 'mongoose-paginate-v2';

export const GiangVienSchema = mongoose.Schema({
  maGV: {
    type: String,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true
  },
  hocHam: {
    type: String,
    enum: [ '-', 'ThS.', 'PGS.TS.', 'TS.' ],
    default: '-'
  },
  phone: String,
  email: {
    type: String,
    required: true
  },
  huongNghienCuu: String,
  hoiDong: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'HoiDong'
  },
});

GiangVienSchema.plugin(upsertMany);
GiangVienSchema.plugin(mongoosePaginate);

const GiangVien = mongoose.model('GiangVien', GiangVienSchema, 'GiangVien');

export default GiangVien;