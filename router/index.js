import express from 'express';
const router = express.Router();

import userRouter from './userRouter';
import cartRouter from './cartRouter';
import kakaoRouter from './kakaoRouter';

router.use('/users', userRouter);
router.use('/carts', cartRouter);
router.use('', kakaoRouter);

export default router;
