import mongoose from 'mongoose';
import upsertMany from '@meanie/mongoose-upsert-many';
import mongoosePaginate from 'mongoose-paginate-v2';

export const SinhVienSchema = mongoose.Schema({
  maSV: {
    type: String,
    required: true
  },
  lopSH: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true
  },
  // image: String,
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['CDK', 'DTH', 'DHT', 'DD'],
    default: 'CDK'
  },
  diemTB: {
    type: Number,
    default: 0,
    min: [0, 'Điểm trong khoảng 0 tới 10'],
    max: [10, 'Điểm trong khoảng 0 tới 10']
  },
  diemKL: {
    type: Number,
    default: 0,
    min: [0, 'Điểm trong khoảng 0 tới 10'],
    max: [10, 'Điểm trong khoảng 0 tới 10']
  }
}, { timestamps: true });

SinhVienSchema.plugin(upsertMany);
SinhVienSchema.plugin(mongoosePaginate);

const SinhVien = mongoose.model('SinhVien', SinhVienSchema, 'SinhVien');

export default SinhVien;