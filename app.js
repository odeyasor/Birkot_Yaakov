import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { router as login } from './server/routers/login.js';
import {router as prod } from './server/routers/prod.js';
import { router as basket} from './server/routers/basket.js';
import {router as order } from './server/routers/order.js';
import {router as admin} from './server/routers/admin.js';
import {router as thisR} from './server/routers/this.js';
import session from 'express-session';
import mongoose from 'mongoose';
import cron from 'node-cron';
import dotenv from 'dotenv';
dotenv.config();
//import bcrypt from 'bcryptjs';
const port = 3000;
const app = express(); // הוספת הגדרת app
app.use(bodyParser.json());
console.log(process.env.JWT_SECRET_KEY)

// הגדרת Middleware
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: 'your-secret-key', // סוד לחתימה על ה-session. תחליף במשהו חזק יותר בפרודקשן.
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // באפשרותך לשנות ל-true אם אתה משתמש ב-HTTPS
}));
const corsOptions = {
  origin: '*', // הכתובת של הלקוח שלך (אם זה מקומי, נסה 'http://localhost:3000')
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
  preflightContinue:false,
  credentials: true, // אם אתה משתמש ב-cookies או credentials
  optionsSuccessStatus:204
};


app.use(cors(corsOptions));
app.use(express.json());
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();});
app.use((req, res, next) => {
  res.cookie('token', 'yourTokenValue', { httpOnly: true, secure: true });
  next();});

// הגדרת מנוע תבניות
app.set('view engine', 'ejs');
app.set('views', './views');

app.use("/login", login);
app.use('/prod', prod);
app.use('/basket', basket);
app.use('/order', order);
app.use('/admin', admin);
app.use('/this', thisR);

// חיבור למסד נתונים
import('./server/db/mongoConnect.js');

/*// המערכת תסגר כל יום מוצאי שבת בחצות
cron.schedule('0 0 * * 0', () => {
  console.log('פעולה מתבצעת!');
  
});

console.log('המשימה מתוזמנת לפעולה כל שבוע ביום ראשון בשעה 10:00');
*/

// השקת השרת
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
