import Order from '../models/order.js';
import {
  getNextSaturday,
  getParashatHashavua,
  findThis,
  saveStatus,
  findAllOrders,
  createHistory,
  clearOrders,
  clearBaskets
}from '../services/statusService.js';

export const close = () => {
    const thisw = findThis();
    thisw.opened = false;
    saveStatus(thisw);
    
    clearBaskets();    
} 

export const open = ()=> {
    // קבלת התאריך הנוכחי
    const now = DateTime.now();
    thisw = This.findOne({idWeek:1});

    const orders = findAllOrders();
    if (!orders.length)
        return res.status(404).send('No items found');

    for (const item of orders){
        const his = {
            date: now,
            orders : item,
            parasha:thisw.parasha
        }
        createHistory(his);
    }
    clearOrders();
    // קבלת התאריך של שבת הבאה
    const nextSaturday = getNextSaturday(now);

    // חישוב פרשת השבוע של שבת הבאה
    const parasha = getParashatHashavua(nextSaturday);
    
    thisw.parasha = parasha;
    thisw.opened = true;
    saveStatus(thisw);
}

