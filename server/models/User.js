import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [ 'Khach', 'SinhVien', 'GiangVien', 'CanBoKhoa', 'ChuNhiemKhoa' ],
    default: 'Khach'
  },
  email: {
    type: String,
    required: true
  },
  picture: {
    type: String,
    default: 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
  },
  relatedInfoSV: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SinhVien'
  },
  relatedInfoGV: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'GiangVien'
  },
});

const User = mongoose.model('User', userSchema, 'User');

export default User;