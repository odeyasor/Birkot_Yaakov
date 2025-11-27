const emailAdmin = 'halbermch@gmail.com';
//const directoratePwd = 'By6136713'
import Order from "../models/order.js";
import Prod from "../models/prod.js";
import Basket from "../models/basket.js";
import User from '../models/user.js';
import Direc from "../models/direc.js";

export const isUser = async (secret) => {
    const myEmail = secret;
    const user = User.findOne({myEmail});
    //console.log(user.direcName);
    if (user) return true;
    return false;
}

export const ifDirec = async (secret) => {
    const myEmail = secret;
    const direc = Direc.findOne({myEmail});
    //console.log('direc', direc);
    if (direc) {return true;}
    return false;
}

export const findOrders = async() => {
    return await Order.find();
}

export const findBasketByEmail = async(email) => {
    const d= await Basket.find({ email });
    console.log(d);
    console.log(email);
    return await d;
}

export const findProdById = async(prodId) => {
    return await Prod.findOne({ prodId });
}

export const saveProd = async(product) => {
    await product.save();
}
export const saveItem = async (basketItem) =>{
    console.log('service');
    await basketItem.save();
}
export const findUserByEmail = async (email) => {
    return await User.findOne({ email });
};

export const createAndSaveOrder = async (orderData) => {
    const newOrder = new Order(orderData);
    await newOrder.save();
};

export const deleteBasketsByEmail = async(email) => {
    await Basket.deleteMany({ email });
}
/*export const = async() => {
    
}*/