import express from 'express';

import { getThuMucs, getThuMucById, createThuMuc,
    updateThuMucById, deleteThuMuc } from '../controllers/thuMucCtrl.js';

const router = express.Router();

router.get('/', getThuMucs);
router.get('/:id', getThuMucById);
router.post('/', createThuMuc);
router.post('/:id', updateThuMucById);
router.delete('/:id', deleteThuMuc);

export default router;