import Basket from '../models/basket.js';
import Order from '../models/order.js';
import Prod from '../models/prod.js';
import User from '../models/user.js';

import {
    ifDirec,
    isUser,
    findOrders,
    findBasketByEmail,
    findProdById,
    saveProd,
    findUserByEmail,
    createAndSaveOrder,
    deleteBasketsByEmail,
    saveItem
}from '../services/orderService.js';
import {getStatus} from '../services/thisService.js';

//get all the orders
export const getOrders = async (req, res) => {
  try {
    console.log('arrived at getOrders controller')
    const permit = await ifDirec(req.user);
    //console.log('!permit', !permit);
    if(!permit){
        return res.status(508).send('you are not allowed to do it!');
    }
    const orders = await findOrders();
    if (!orders){
        return res.status(406).send('orders havent found');
    }
    return res.status(200).json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Error fetching orders');
  }
};
/***************************************************/

export const calcToPayAndUpdateBasket = async (req, res) => {
  console.log('Arrived at createOrderFromBasket controller');
  console.log('arrived');
  try {
    const { email } = req.user;

    if (!email) {
      return res.status(400).send('Email is required');
    }
    console.log('email', email);
    const permit = isUser(email);
    //console.log('!permit', !permit);
    if(!permit){
        return res.status(508).send('you are not allowed to do it!');
    }
    console.log('permit',permit);;
    // חפש את כל הפריטים בסל של הלקוח לפי email
    const basketItems = await findBasketByEmail(email);
    console.log(1);
    if (!basketItems.length) {
      return res.status(404).send('No items found in basket for this email');
    }
    console.log('basketItems', basketItems);;
    let sum = 0;
    for (const item of basketItems) {
      // מצא את המוצר לפי prodId
      const product = await findProdById(item.prodId);//
      if (!product) {
        console.error(`Product not found: ${item.prodId}`);
        return res.status(404).send(`Product not found: ${item.prodId}`);
      }
      console.log(product.prodName);
      console.log(product.available < item.count);
      // בדוק אם יש מספיק מלאי
      if (product.available < item.count) {
        console.log('if');
        // אם מלאי נמוך, עדכן את הכמות לסכום הזמין
        item.count = product.available;
        await saveItem(item);
        console.log('saved');
      }
      const cost = item.count*product.price;
      console.log('cost',cost);
      console.log('------',sum + cost);
      sum += cost;
      console.log('sum',sum);
    }
    return res.status(201).json({sum});
  } catch(e){
    return res.status(500).json({message: 'server error', error:e});
  }
}

// Moving basket to orders when paying well
export const createOrderFromBasket = async (req, res) => {
  console.log('Arrived at createOrderFromBasket controller');
  try {
    const { email } = req.user;

    if (!email) {
      return res.status(400).send('Email is required');
    }
    const permit = isUser(email);
    //console.log('!permit', !permit);
    if(!permit){
        return res.status(508).send('you are not allowed to do it!');
    }
    
    // חפש את כל הפריטים בסל של הלקוח לפי email
    const basketItems = await findBasketByEmail(email);
    console.log(1);
    if (!basketItems.length) {
      return res.status(404).send('No items found in basket for this email');
    }
    console.log(2);
    for (const item of basketItems) {
      // מצא את המוצר לפי prodId
      const product = await findProdById(item.prodId);//
      if (!product) {
        console.error(`Product not found: ${item.prodId}`);
        return res.status(404).send(`Product not found: ${item.prodId}`);
      }
      console.log(product.prodName);

      // עדכן את מלאי המוצר
      product.available -= item.count;
      await saveProd(product);
    }
    //מציאת יוזר על פי מייל
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(404).send('User not found');
    }
    const userName = user.userName;
    console.log('userName', userName);
    // צור ושמור רשומת הזמנה חדשה עם הפריטים מהסל
    const newOrder = {
      user: [{
        userName:user.userName,
        email:user.email,
        city: user.city,
        street: user.street,
        houseNum: user.houseNum
      }],
      items: basketItems.map(item => ({
        prodId: item.prodId,
        prodName: item.prodName,
        count: item.count
      }))
    };
    await createAndSaveOrder(newOrder);

    console.log(3);
    // מחק את הפריטים מהסל לאחר הוספתם להזמנה
    await deleteBasketsByEmail(email);
    
    console.log(4);
    res.status(201).send("Order created successfully");

  } catch (error) {
    console.error('Error creating order from basket:', error);
    res.status(500).send('Error creating order from basket');
  }
};


/*import Basket from '../models/basket.js';
import Order from '../models/order.js';

//moving basket to orders when paynig well
export const createOrderFromBasket = async (req, res) => {
  console.log('Arrived at createOrderFromBasket controller');
  try {
    const { userName } = req.body; 

    if (!userName) {
      return res.status(400).send('User name is required');
    }

    // חפש את כל הפריטים בסל של הלקוח לפי userName
    const basketItems = await Basket.find({ userName });

    if (!basketItems.length) {
      return res.status(404).send('No items found in basket for this user');
    }

    // צור רשומת הזמנה חדשה עם הפריטים מהסל
    const newOrder = new Order({
      userName,
      items: basketItems.map(item => ({
        prodId: item.prodId,
        prodName: item.prodName,
        count: item.count
      }))
    });

    // שמור את רשומת ההזמנה החדשה
    await newOrder.save();

    // מחק את הפריטים מהסל לאחר הוספתם להזמנה
    await Basket.deleteMany({ userName });

    res.status(201).send("good");
  } catch (error) {
    console.error('Error creating order from basket:', error);
    res.status(500).send('Error creating order from basket');
  }
};
*/