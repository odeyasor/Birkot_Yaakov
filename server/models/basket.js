import mongoose from 'mongoose';

const { Schema } = mongoose;

// Create a schema for the basket item
const basketSchema = new Schema({
  prodName: { type: String, required: true },
  prodId: { type: Number, required: true },
  count: { type: Number, required: true },
  userName: { type: String, required: true },
  email: {type: String, required: true},
  url: {type: String, required:true},
  price: {type:Number, required: true}
}, {
  collection: 'baskets',
  //timestamps: true // Optionally track when items are added or updated
});

// Create and export a model for the basket item
const Basket = mongoose.model('baskets', basketSchema);

export default Basket;
