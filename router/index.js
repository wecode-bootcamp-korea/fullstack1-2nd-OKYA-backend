import express from 'express';
import kakaoRouter from './kakaoRouter';
const router = express.Router();

router.use('/', kakaoRouter);

export default router;
