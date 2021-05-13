import mongoose from 'mongoose';
import { FileNopSchema } from './FileNop.js';

const thuMucSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  files: {
    type: [ FileNopSchema ]
  },
  deadline: {
    type: Date,
    default: new Date((new Date()).getTime() + (10 * 86400000))
  }
});

const ThuMuc = mongoose.model('ThuMuc', thuMucSchema, 'ThuMuc');

export default ThuMuc;