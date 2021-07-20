import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const TaskLogSchema = mongoose.Schema({
  description: {
    type: String,
    required: [true, 'Vui lòng nhập mô tả']
  },
  sinhVien: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SinhVien',
    required: [true, 'Vui lòng chọn sinh viên']
  },
  logDate: {
    type: Date,
    required: [true, 'Vui lòng nhập ngày log'],
    default: Date.now(),
  },
  spentTime: {
    type: Number,
    required: true,
    min: [0.5, 'Thời gian làm việc nhỏ nhất là 0.5'],
    max: [24, 'Thời gian làm việc lớn nhất là 24'],
  },
  commitLink: {
    type: String
  },
  deTai: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DeTai',
    required: [true, 'Đề tài không được để trống']
  }
}, { timestamps: true });

TaskLogSchema.path('commitLink').validate((val) => {
  if (!val) {
    return true;
  }
  var urlRegex = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/;
  return urlRegex.test(val);
}, 'Github Commit link không hợp lệ');

TaskLogSchema.plugin(mongoosePaginate);

const TaskLog = mongoose.model('TaskLog', TaskLogSchema, 'TaskLog');

export default TaskLog;