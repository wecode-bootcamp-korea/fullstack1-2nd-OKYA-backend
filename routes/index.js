const express = require('express');
const router = express.Router();

import auth from './auth';

router.use('/auth', auth);

export default router;
