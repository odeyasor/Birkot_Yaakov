import mongoose from "mongoose";
import bcrypt from 'bcryptjs';
const {Schema} = mongoose;

const UserSchema = new Schema({
    userName: { type: String, required: true },
    pwd: { type: String, required: true ,unique: true},
    email: { type: String, required: true , unique: true},
    city: {type: String, required: true},
    street: {type: String, required: true},
    houseNum: {type: Number, required: true}
},{
    collection: 'users',
    //timestamps: true
});

UserSchema.pre('save', async function(next) {
    if (!this.isModified('pwd')) {
      return next();
    }
  
    try {
      const salt = await bcrypt.genSalt(10);
      this.pwd = await bcrypt.hash(this.pwd, salt);
      next();
    } catch (err) {
      next(err);
    }
});
  
const User = mongoose.model('User', UserSchema);

export default User;
