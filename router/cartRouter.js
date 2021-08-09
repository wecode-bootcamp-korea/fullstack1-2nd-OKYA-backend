import express from 'express';
const router = express.Router();

import { cartController } from '../controller';
import validateToken from '../middleware/verify_jwt';

router.get('/', validateToken, cartController.getCartItems);
router.patch('/:id', validateToken, cartController.updateCartItemQuantity);
router.delete('/', validateToken, cartController.deleteCartItems);
router.post('/', validateToken, cartController.createCartItems);

export default router;
