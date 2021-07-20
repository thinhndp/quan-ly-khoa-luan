import express from 'express';

import { getPhongHocs, createPhongHoc, deletePhongHoc, getPhongHocById,
    updatePhongHocById, getPhongHocsWithQuery } from '../controllers/phongHocCtrl.js';

const router = express.Router();

router.get('/', getPhongHocs);
router.post('/q', getPhongHocsWithQuery);
router.get('/:id', getPhongHocById);
router.post('/', createPhongHoc);
router.post('/:id', updatePhongHocById);
router.delete('/:id', deletePhongHoc);

export default router;