// models/order.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const historySchema = new Schema({
    orders: [{
        userName: { type: String, required: true },
        items: [{
          prodId: { type: Number, required: true },
          prodName: { type: String, required: true },
          count: { type: Number, required: true }
        }]
    }],
  date: {type: Date, required:true},
  parash: {type: String,required:true}
}, {
  collection: 'histories',
//  timestamps: true
});

const Order = mongoose.model('Histo', historySchema);

export default Order;
