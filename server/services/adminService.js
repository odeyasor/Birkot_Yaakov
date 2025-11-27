// Validate password
import dotenv from 'dotenv';
import Direc from '../models/direc.js';
dotenv.config();
const emailAdmin = 'halbermch@gmail.com';
const directoratePwd = 'By6136713'

export const ValidPwd = (pwd) => {
    let isU= /[A-Z]/.test(pwd), isl=/[a-z]/.test(pwd), isLen = pwd.length >=8;
    console.log('isLen'+isLen+', isU'+  isU+', isl'+ isl);
    return isLen && isU && isl;
};

export const  isAdmin = async (secret) => {
    const myEmail = secret.email;
    console.log('myEmail', myEmail);
    let  isAdmin = emailAdmin == myEmail;
    console.log('isAdmin', await isAdmin);
    if (isAdmin)
        return true;
    return false;
}

export const checkDirecPwd = async (direcPwd) => {
    return direcPwd == directoratePwd;
}

export const createAndSaveDirec = async (direcData) => {
    const newDirec = new Direc(direcData);
    await newDirec.save();
};

export const getDirectors = async () =>{
    return await Direc.find();
}

export const findDirecByFullName = async (fullName) => {
    const d= await Direc.find({ fullName:fullName });
    console.log(d);
    return await d;
}
export const findDirecByEmail = async (email) => {
    const d= await Direc.findOne({ email:email });
    console.log(d);
    return await d;
}
export const deleteDirecByDirecName = async (direcName) => {
    const direc =  await Direc.findOneAndDelete({ direcName });
    if (direc){
        console.log(direc);
        return direc;
    }
    else{
        console.log(null);
        return null;
    }
}