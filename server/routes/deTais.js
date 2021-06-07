import express from 'express';

import { getDeTais, getDeTaiById, updateDeTaiById, createManyDeTais, deleteDeTaiById, applyForDeTai } from '../controllers/deTaiCtrl.js';

const router = express.Router();

router.get('/', getDeTais);
router.get('/:id', getDeTaiById);
router.post('/update/:id', updateDeTaiById);
router.post('/create-many/', createManyDeTais);
router.delete('/:id', deleteDeTaiById);
router.post('/apply/', applyForDeTai);

export default router;