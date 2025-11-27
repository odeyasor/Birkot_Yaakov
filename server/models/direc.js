import mongoose from "mongoose";
//import bcrypt from 'bcryptjs'; 
const { Schema } = mongoose;

const DirecSchema = new Schema({
    direcName: { type: String, required: true, unique: true},
    fullName:{type:String, required: true},
    email: { type: String, required: true, unique: true }, 
    direcPwd: { type: String, required: true },
    privatePwd: { type: String, required: true,unique: true }
}, {
    collection: 'directorates',
    //timestamps: true
});


const Direc = mongoose.model('Direc', DirecSchema);

export default Direc;
