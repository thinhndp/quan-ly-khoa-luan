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

BieuMauSchema.path('link').validate((val) => {
  if (!val) {
    return true;
  }
  var urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Link không hợp lệ');

BieuMauSchema.plugin(mongoosePaginate);

const BieuMau = mongoose.model('BieuMau', BieuMauSchema, 'BieuMau');

export default BieuMau;