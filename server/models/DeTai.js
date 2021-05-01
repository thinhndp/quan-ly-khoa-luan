import mongoose from 'mongoose';
import { GiangVienSchema } from './GiangVien.js';
import { SinhVienSchema } from './SinhVien.js';

const deTaiSchema = mongoose.Schema({
  tenDeTai: {
    type: String,
    required: true
  },
  giangVien: GiangVienSchema,
  trangThai: {
    type: String,
    enum: [ 'CD', 'DD', 'DTH', 'HT' ],
    default: 'CD'
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
  // sinhVienThucHien: {
  //   type: [SinhVienSchema],
  //   validate: {
  //     validator: function(v) {
  //       return !(this.sinhVienThucHien.length > 2);
  //     },
  //     message: props => `${props.value} exceeds the maximum array size (2)!`
  //   }
  // },
  sinhVien1: SinhVienSchema,
  sinhVien2: SinhVienSchema,
  moTa: String
});

const DeTai = mongoose.model('DeTai', deTaiSchema, 'DeTai');

export default DeTai;