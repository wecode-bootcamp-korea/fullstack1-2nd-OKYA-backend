import express from 'express';
const router = express.Router();

import { cartController } from '../controller';
import validateToken from '../middleware/verify_jwt';

router.get('/', validateToken, cartController.getCartItems);

export default router;
