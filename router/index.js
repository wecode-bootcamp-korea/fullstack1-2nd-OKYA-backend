import express from 'express';
const router = express.Router();

import productRouter from './productRouter';

router.use('/products', productRouter);

export default router;
