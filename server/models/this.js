import mongoose from 'mongoose';

const { Schema } = mongoose;

const ThisSchema = new Schema({
  idWeek: {
    type: Number,
    required:true,
    default:1
  },
  opened: {
    type: Boolean,
    required: true
  },
  parash: {
    type: String,
    required: true
  }
}, {
    collection: 'thisWeek',
  //  timestamps: true
});

const This = mongoose.model('This', ThisSchema);

export default This;
