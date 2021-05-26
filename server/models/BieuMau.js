import mongoose from 'mongoose';

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

const BieuMau = mongoose.model('BieuMau', BieuMauSchema, 'BieuMau');

export default BieuMau;