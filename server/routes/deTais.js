import express from 'express';

import { getDeTais, createManyDeTais } from '../controllers/deTaiCtrl';

const router = express.Router();

router.get('/', getDeTais);
router.post('/create-many', createManyDeTais);

export default router;