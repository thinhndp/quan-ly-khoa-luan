import express from 'express';

import { getBieuMaus, createBieuMau, deleteBieuMau, getBieuMauById, updateBieuMauById,
  getBieuMausWithQuery } from '../controllers/bieuMauCtrl.js';

const router = express.Router();

router.get('/', getBieuMaus);
router.post('/q', getBieuMausWithQuery);
router.get('/:id', getBieuMauById);
router.post('/', createBieuMau);
router.post('/:id', updateBieuMauById);
router.delete('/:id', deleteBieuMau);

export default router;