import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const kyThucHien = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Vui lòng nhập tên Kỳ thực hiện']
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
  }
});

kyThucHien.plugin(mongoosePaginate);

const KyThucHien = mongoose.model('KyThucHien', kyThucHien, 'KyThucHien');

export default KyThucHien;