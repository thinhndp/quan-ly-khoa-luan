import mongoose from 'mongoose';

const phongHocSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
});

const PhongHoc = mongoose.model('PhongHoc', phongHocSchema, 'PhongHoc');

export default PhongHoc;