import express from 'express';
import { 
    createOrderFromBasket, 
    getOrders ,
    calcToPayAndUpdateBasket
} from '../controllers/orderController.js';
import verifyToken from '../middleware/middleware.js';

const router = express.Router();

router.get('/getOrders',verifyToken, getOrders);
router.post('/pay-moveToOrders',verifyToken, createOrderFromBasket);
router.put('/calc',verifyToken, calcToPayAndUpdateBasket);

export {router};
