import express from 'express';
const router = express.Router();

import { cartController } from '../controller';
import validateToken from '../middleware/verify_jwt';

router.get('/', validateToken, cartController.getCartItems);
router.patch('/:id', validateToken, cartController.updateCartItemQuantity);

export default router;
