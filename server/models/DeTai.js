import mongoose from 'mongoose';
import { GiangVienSchema } from './GiangVien.js';
import { SinhVienSchema } from './SinhVien.js';
import mongoosePaginate from 'mongoose-paginate-v2';

const deTaiSchema = mongoose.Schema({
  tenDeTai: {
    type: String,
    required: true
  },
  // giangVien: GiangVienSchema,
  giangVien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiangVien'
  },
  trangThaiDuyet: {
    type: String,
    enum: [ 'CD', 'DD', 'DTC' ],
    default: 'CD'
  },
  trangThaiThucHien: {
    type: String,
    enum: [ '-', 'CDK', 'DTH', 'DH', 'HT' ],
    default: '-'
  },
  heDaoTao: {
    type: String,
    enum: [ 'DT', 'CLC' ]
  },
  diemSo: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  },
  sinhVienThucHien: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SinhVien'
    }]
  },
  sinhVien1: SinhVienSchema,
  sinhVien2: SinhVienSchema,
  moTa: String,
  kyThucHien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'KyThucHien'
  }
});

deTaiSchema.plugin(mongoosePaginate);

const DeTai = mongoose.model('DeTai', deTaiSchema, 'DeTai');

export default DeTai;