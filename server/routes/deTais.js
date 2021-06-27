import express from 'express';

import { getDeTais, getDeTaisWithQuery, getDeTaiById, updateDeTaiById, createManyDeTais, deleteDeTaiById, applyForDeTai,
    getDeTaiBySinhVienId, getDeTaisByKTHId } from '../controllers/deTaiCtrl.js';

const router = express.Router();

router.get('/', getDeTais);
router.post('/q', getDeTaisWithQuery);
router.get('/:id', getDeTaiById);
router.get('/get-by-sinh-vien/:id', getDeTaiBySinhVienId);
router.get('/get-by-ky-thuc-hien/:id', getDeTaisByKTHId);
router.post('/update/:id', updateDeTaiById);
router.post('/create-many/', createManyDeTais);
router.delete('/:id', deleteDeTaiById);
router.post('/apply/', applyForDeTai);

export default router;