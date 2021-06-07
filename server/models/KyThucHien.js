import mongoose from 'mongoose';

const kyThucHien = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: [ 'CBD', 'DDR', 'DKT' ],
    default: 'CBD'
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
});

const KyThucHien = mongoose.model('KyThucHien', kyThucHien, 'KyThucHien');

export default KyThucHien;