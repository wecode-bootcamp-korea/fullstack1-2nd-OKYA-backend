import express from 'express';
const router = express.Router();

import cartRouter from './cartRouter';

router.use('/cart', cartRouter);

export default router;
