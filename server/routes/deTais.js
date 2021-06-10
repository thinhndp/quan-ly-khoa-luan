import express from 'express';

import { getDeTais, getDeTaisWithQuery, getDeTaiById, updateDeTaiById, createManyDeTais, deleteDeTaiById, applyForDeTai } from '../controllers/deTaiCtrl.js';

const router = express.Router();

router.get('/', getDeTais);
router.post('/q', getDeTaisWithQuery);
router.get('/:id', getDeTaiById);
router.post('/update/:id', updateDeTaiById);
router.post('/create-many/', createManyDeTais);
router.delete('/:id', deleteDeTaiById);
router.post('/apply/', applyForDeTai);

export default router;