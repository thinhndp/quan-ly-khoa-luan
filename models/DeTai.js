import mongoose from 'mongoose';
import { GiangVienSchema } from './GiangVien.js';
import { SinhVienSchema } from './SinhVien.js';
import mongoosePaginate from 'mongoose-paginate-v2';
import upsertMany from '@meanie/mongoose-upsert-many';

const deTaiSchema = mongoose.Schema({
  tenDeTai: {
    type: String,
    required: true,
    trim: true,
    unique: [true, "Trùng với tên đề tài đã có"],
  },
  englishName: {
    type: String,
    trim: true,
    unique: [true, "Trùng với tên đề tài đã có"],
  },
  // giangVien: GiangVienSchema,
  giangVien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiangVien',
    required: true
  },
  canBoPhanBien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiangVien',
  },
  trangThaiDuyet: {
    type: String,
    enum: [ 'CD', 'DD', 'DTC' ],
    default: 'CD'
  },
  trangThaiThucHien: {
    type: String,
    enum: [ 'CDK', 'DTH', 'DH', 'HT' ],
    default: 'CDK'
  },
  heDaoTao: {
    type: String,
    enum: [ 'DT', 'CLC' ]
  },
  /* diemSo: {
    type: Number,
    min: 0,
    max: 10,
    default: 0
  }, */
  diemSo: {
    type: [{
      type: Number,
      min: [0, "Điểm số phải nằm trong khoảng 0 đến 10"],
      max: [10, "Điểm số phải nằm trong khoảng 0 đến 10"],
    }],
    default: [ 0, 0 ]
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
    ref: 'KyThucHien',
    required: true,
  },
  xacNhanGiuaKi: {
    sinhVien1: {
      type: {
        tiepTuc: { type: Boolean, default: true },
        lyDoDung: { type: String, trim: true },
      },
      default: { tiepTuc: true, lyDoDung: '',},
    },
    sinhVien2: {
      type: {
        tiepTuc: { type: Boolean, default: true },
        lyDoDung: { type: String, trim: true },
      },
      default: { tiepTuc: true, lyDoDung: '' },
    },
    thayDoiTen: { type: Boolean, default: false },
    newName:  { type: String, trim: true },
    newEnglishName:  { type: String, trim: true },
    lyDoDoiTen: { type: String, trim: true },
    pending: { type: Boolean, default: false },
    status: {
      type: String,
      enum: [ 'CXN', 'DXN', 'DTC' ],
      default: 'CXN'
    },
    progressPending: { type: Boolean, default: false },
    progressRejected: { type: Boolean, default: false },
    oldName: { type: String, default: '' },
    oldEngName: { type: String, default: '' }
  }
});

deTaiSchema.plugin(upsertMany);
deTaiSchema.plugin(mongoosePaginate);

const DeTai = mongoose.model('DeTai', deTaiSchema, 'DeTai');

export default DeTai;