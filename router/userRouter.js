import express from 'express';
import { userController } from '../controller';

const router = express.Router();

router.post('/signup', userController.userSignUp);
router.post('/login', userController.userLogin);

export default router;
