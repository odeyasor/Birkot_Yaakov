import This from "../models/this.js"
import Order from "../models/order.js";
import Histo from '../models/history.js';

import Hebcal from 'hebcal';
import { DateTime } from 'luxon';
import Basket from "../models/basket.js";

// פונקציה לחישוב התאריך של יום שבת הקרוב
export const getNextSaturday = (date) => {
  const nextSaturday = date.plus({ days: (6 - date.weekday) + 7 }); // החישוב של שבת הבאה
  return nextSaturday;
};

// פונקציה לקבלת פרשת השבוע עבור תאריך נתון
export const getParashatHashavua = (date) => {
  const hebcal = new Hebcal(date.toISODate());
  const parashatHashavua = hebcal.getParasha();
  return parashatHashavua;
};

export const findThis = ()=>{
    return  This.findOne({idWeek:1});
}

export const saveStatus = async (thisw)=>{
    await thisw.save();
}

export const findAllOrders = async ()=>{
    return await Order.find();
}


export const createHistory =  (hisData)=>{
    const history = new Histo(hisData);
    history.save();
}



export const clearOrders =  ()=>{
    const result = Order.deleteMany({});
}

export const clearBaskets =  ()=>{
    const result = Basket.deleteMany({});
}

/*
export const  =  ()=>{
    
}
*/
