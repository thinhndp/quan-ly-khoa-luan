import express from 'express';

import { getDeTais, createManyDeTais, deleteDeTaiById } from '../controllers/deTaiCtrl.js';

const router = express.Router();

router.get('/', getDeTais);
router.post('/create-many/', createManyDeTais);
router.delete('/:id', deleteDeTaiById);

export default router;