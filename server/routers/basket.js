import express from 'express';
import verifyToken from '../middleware/middleware.js';
import { 
    getBasket,
    addToBasket,
    incrementCount,
    decrementCount
} from '../controllers/basketController.js';

const router = express.Router();

// Route to get all items in the basket for a specific customer
router.get('/getBasket',verifyToken, getBasket);
router.post('/addToBasket',verifyToken, addToBasket)
router.put('/incrementCount',verifyToken, incrementCount);
router.put('/decrementCount',verifyToken, decrementCount);

export {router};
