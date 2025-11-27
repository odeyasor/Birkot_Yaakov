import express from 'express';
import Prod from '../models/prod.js'; // נתיב למודל המוצר
import {
    getProds,
    addProdToDB,
    updateProd,
    deleteProd,
} from '../controllers/prodController.js';
import verifyToken from '../middleware/middleware.js';
import { uploadProductImage } from '../middleware/upLoad.js';

const router = express.Router();

/// נתיב לקבלת 50 מוצרים שעוד לא הוצגו
router.get('/getProds',verifyToken, getProds);
//add new product to DB
router.post('/addProdToDB',verifyToken,uploadProductImage, addProdToDB);
//update a product
router.put('/updateProd', verifyToken,updateProd);
//delete product from db
router.delete('/deleteProd',verifyToken, deleteProd);

export {router};
