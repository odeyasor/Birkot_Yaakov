// routes/myRoutes.js
import express from 'express';
import { getThis } from '../controllers/thisConstroller.js';

const router = express.Router();

// נתיב לקבלת פרשה לפי ID
router.get('/', getThis);


export {router};
