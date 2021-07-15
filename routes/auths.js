import express from 'express';

import { authGoogle } from '../controllers/authCtrl.js';

const router = express.Router();

router.post('/google', authGoogle);

export default router;