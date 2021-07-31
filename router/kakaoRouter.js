import express from 'express';
import { kakaoController } from '../controller';

const router = express.Router();

router.post('/kakao/login', kakaoController.kakaoLogin);

export default router;
