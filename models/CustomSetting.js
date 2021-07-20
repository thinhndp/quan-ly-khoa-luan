import mongoose from 'mongoose';

const customSettingSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  values: {
    type: Array,
    default: []
  }
}, { timestamps: true });

const CustomSetting = mongoose.model('CustomSetting', customSettingSchema, 'CustomSetting');

export default CustomSetting;