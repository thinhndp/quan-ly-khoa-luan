import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const phongHocSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
}, { timestamps: true });

phongHocSchema.plugin(mongoosePaginate);

const PhongHoc = mongoose.model('PhongHoc', phongHocSchema, 'PhongHoc');

export default PhongHoc;