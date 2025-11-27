import Basket from '../models/basket.js';
import Prod from '../models/prod.js';
import User from '../models/user.js';
import { findUserByEmail } from '../services/orderService.js';
import {getStatus} from '../services/thisService.js';

export const getBasket = async (req, res) => {
    console.log('Arrived at getBasket');
    try {
        console.log(req.user)
        const { email } = req.user; 
        console.log(email);
        if (!email) {
            return res.status(400).send('Email is required');
        }

        // חיפוש פריטים בסל לפי email ומיון לפי prodId
        const items = await Basket.find({ email })
            .sort({ prodId: 1 }); // מיין את התוצאות לפי prodId בסדר עולה

        if (!items.length) {
            return res.status(404).send('No items found for this user');
        }
        res.status(200).send(items);
    } catch (error) {
        console.error('Error getting basket items:', error);
        res.status(500).send('Error getting basket items');
    }
};

//add to basket

export const addToBasket = async (req, res) => {
    console.log('Arrived at addItemToBasket controller');
    try {
        const open = getStatus();
        if (!open)
            return res.status(505).send('closed');
        const {  prodId} = req.body; // כלול גם userName וגם email
        const { email } = req.user; 
        const count = 1;

        if (!prodId ||  !email) {
            return res.status(400).send('All product details and either userName or email are required');
        }

        // חפש את המוצר לפי prodId
        const product = await Prod.findOne({ prodId });

        if (!product) {
            return res.status(404).send('Product not found');
        }
        console.log('Product exists');

        // בדוק אם thisWeek של המוצר שווה ל-true
        if (!product.thisWeek) {
            return res.status(400).send('Product is not available this week');
        }
        console.log('This week is true');
        console.log(email);

        // חפש את המשתמש לפי userName או email
        const existingBasketItem = await Basket.findOne({ prodId, email });
        if (existingBasketItem) {
            return res.status(404).send('go to plus');
        }
        console.log('User exists');

        const user = await findUserByEmail(email);
        if (!user){
            return res.status(405).send('no user');
        }

        // יצירת פריט חדש בסל
        const newBasketItem = new Basket({
            prodName: product.prodName,
            prodId,
            count,
            userName: user.userName, // שמור את userName מהממצא
            email: email, // שמור את email מהממצא
            url: product.url,
            price: product.price
        });

        // בדוק אם פרטי המוצר בסל תואמים לפרטי המוצר במאגר
        if (newBasketItem.prodId !== product.prodId || newBasketItem.prodName !== product.prodName) {
            return res.status(400).send('Product details do not match');
        }
        console.log('Product details match');

        // בדוק אם יש כמות מספקת מהמוצר במאגר
        if (product.available < 1) {
            return res.status(400).send('There are no available items left of this product.');
        }
        console.log('Availability is positive');

        // שמור את הפריט החדש בסל
        await newBasketItem.save();

        res.status(201).json(newBasketItem);
    } catch (error) {
        console.error('Error adding item to basket:', error);
        res.status(500).send('Error adding item to basket');
    }
};


//plus to count

export const incrementCount = async (req, res) => {
    console.log('Arrived at incrementProductCount controller');
    try {
        const open = getStatus();
        if (!open)
            return res.status(505).send('closed');

        const { prodId} = req.body;
        const { email } = req.user; 

        console.log(prodId, email);

        if (!prodId || !email) {
            return res.status(400).send('Product ID and email are required');
        }

        // חפש את המשתמש לפי email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log('User exists');

        // חפש את הפריט בסל לפי prodId ו-email
        const basketItem = await Basket.findOne({ prodId, userName: user.userName });
        if (!basketItem) {
            return res.status(404).send('Basket item not found');
        }

        // עדכן את הכמות
        basketItem.count += 1;

        // שמור את העדכון בסל
        await basketItem.save();

        res.status(200).json({ newQuantity: basketItem.count });
    } catch (error) {
        console.error('Error incrementing product count:', error);
        res.status(500).send('Error incrementing product count');
    }
};


// minus count
export const decrementCount = async (req, res) => {
    console.log('Arrived at decrementProductCount controller');
    try {
        const open = getStatus();
        if (!open)
            return res.status(505).send('closed');
        
        const { prodId }= req.body;
        const { email } = req.user; 

        console.log(prodId, email);

        if (!prodId || !email) {
            return res.status(400).send('Product ID and email are required');
        }

        // חפש את המשתמש לפי email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }
        console.log('User exists');

        // חפש את הפריט בסל לפי prodId ו-userName של המשתמש
        const basketItem = await Basket.findOne({ prodId, userName: user.userName });
        if (!basketItem) {
            return res.status(404).send('Basket item not found');
        }

        // בדוק אם הכמות היא 1 או פחות
        if (basketItem.count <= 1) {
            // מחק את הפריט מהסל
            await Basket.deleteOne({ prodId, userName: user.userName });
            res.status(200).json({ newQuantity: basketItem.count });
        }

        // עדכן את הכמות
        basketItem.count -= 1;

        // שמור את העדכון בסל
        await basketItem.save();

        res.status(200).json({ newQuantity: basketItem.count });
    } catch (error) {
        console.error('Error decrementing product count:', error);
        res.status(500).send('Error decrementing product count');
    }
};