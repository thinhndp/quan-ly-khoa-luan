import mongoose from 'mongoose';

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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  link: {
    type: String,
    required: true
  }
});

const FileNop = mongoose.model('FileNop', FileNopSchema, 'FileNop');

export default FileNop;