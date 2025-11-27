import mongoose from 'mongoose';
const { Schema } = mongoose;

const ProdSchema = new Schema({
  prodId: { type: Number, required: true, unique: true },
  prodName: { type: String, required: true , unique: true},
  price: { type: Number, required: true, min: 0 },
  available: { type: Number, required: true, min: 0},
  thisWeek:{type: Boolean, required:true},
  url: { type: String, required: true, unique: true }
}, {
    collection: 'products'
    //timestamps: true // הוספת תאריכי יצירה ועדכון
});



// יצירת מודל על פי הסכימה
const Prod = mongoose.model('Prod', ProdSchema);

export default Prod;
