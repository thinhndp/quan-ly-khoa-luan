import express from 'express';

import { getDeTais, createManyDeTais, deleteDeTaiById, applyForDeTai } from '../controllers/deTaiCtrl.js';

const router = express.Router();

router.get('/', getDeTais);
router.post('/create-many/', createManyDeTais);
router.delete('/:id', deleteDeTaiById);
router.post('/apply/', applyForDeTai);

export default router;