import mongoose from 'mongoose';
import { UserSchema } from './User.js';
import upsertMany from '@meanie/mongoose-upsert-many';
import mongoosePaginate from 'mongoose-paginate-v2';

export const FileNopSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  ngayNop: {
    type: Date,
    required: true,
    default: new Date()
  },
  // user: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'User',
  //   required: true
  // },
  // user: {
  //   type: UserSchema,
  //   required: true,
  //   unique: false
  // },
  user: {
    name: {
      type: String,
      trim: true,
      required: true
    },
    email: {
      type: String,
      trim: true,
      required: true
    },
    picture: {
      type: String,
      default: 'https://genslerzudansdentistry.com/wp-content/uploads/2015/11/anonymous-user.png'
    },
  },
  // link: {
  //   type: String,
  //   required: true
  // },
  driveId: {
    type: String,
    required: true
  }
}, { timestamps: true });

FileNopSchema.plugin(upsertMany);
FileNopSchema.plugin(mongoosePaginate);

const FileNop = mongoose.model('FileNop', FileNopSchema, 'FileNop');

export default FileNop;