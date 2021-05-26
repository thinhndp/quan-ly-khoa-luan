import express from 'express';

import { getBieuMaus, createBieuMau, deleteBieuMau, getBieuMauById, updateBieuMauById } from '../controllers/bieuMauCtrl.js';

const router = express.Router();

router.get('/', getBieuMaus);
router.get('/:id', getBieuMauById);
router.post('/', createBieuMau);
router.post('/:id', updateBieuMauById);
router.delete('/:id', deleteBieuMau);

export default router;