import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const BieuMauSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

BieuMauSchema.plugin(mongoosePaginate);

const BieuMau = mongoose.model('BieuMau', BieuMauSchema, 'BieuMau');

export default BieuMau;