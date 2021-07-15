import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const UserSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  role: {
    type: String,
    enum: [ 'Khach', 'SinhVien', 'GiangVien', 'CanBoKhoa', 'ChuNhiemKhoa' ],
    default: 'Khach'
  },
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true
  },
  picture: {
    type: String,
    default: 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
  },
  canApprove: {
    type: Boolean,
    default: false
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

UserSchema.plugin(mongoosePaginate);

const User = mongoose.model('User', UserSchema, 'User');

export default User;