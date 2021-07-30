import express from 'express';
import { productController } from '../controller';

const router = express.Router();

router.get('', productController.showProducts);

export default router;
