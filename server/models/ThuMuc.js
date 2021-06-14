import mongoose from 'mongoose';
import { FileNopSchema } from './FileNop.js';

const thuMucSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  files: {
    type: [ FileNopSchema ],
    default: []
  },
  /* files: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'FileNop'
    }],
    default: []
  }, */
  deadline: {
    type: Date,
    default: new Date((new Date()).getTime() + (10 * 86400000))
  },
  status: {
    type: String,
    enum: [ 'Open', 'Closed' ],
    default: 'Open',
  },
  link: {
    type: String
  },
  driveId: {
    type: String,
    required: true
  }
});

const ThuMuc = mongoose.model('ThuMuc', thuMucSchema, 'ThuMuc');

export default ThuMuc;