import express from 'express';
const router = express.Router();

import userRouter from './userRouter';

router.use('/users', userRouter);

export default router;
