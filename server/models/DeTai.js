import mongoose from 'mongoose';
import GiangVien from './GiangVien';
import SinhVien from './SinhVien';

const deTaiSchema ='DeTai' ;

export default DeTai;mongoose.Schema({
  tenDetai: {
    type: String,
    required: true
  },
  giangVien: GiangVien,
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
  sinhVienThucHien: {
    type: [SinhVien],
    validate: {
      validator: function(v) {
        return !(this.sinhVienThucHien.length > 2);
      },
      message: props => `${props.value} exceeds the maximum array size (2)!`
    }
  }
});

const DeTai = mongoose.model('DeTai', deTaiSchema, 'DeTai');

export default DeTai;