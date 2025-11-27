// models/order.js
//import { json } from 'body-parser';
import mongoose from 'mongoose';

const { Schema } = mongoose;

const orderSchema = new Schema({
  user : [{
    userName: { type: String, required: true },
    email: { type: String, required: true },
    city: {type: String, required: true},
    street: {type: String, required: true},
    houseNum: {type: Number, required: true}
  }],
  items: [{
    prodId: { type: Number, required: true },
    prodName: { type: String, required: true },
    count: { type: Number, required: true }
  }]
}, {
  collection: 'orders',
//  timestamps: true
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
