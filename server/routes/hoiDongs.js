import express from 'express';

import { getHoiDongById, getHoiDongs, createHoiDong } from '../controllers/hoiDongCtrl.js';

const router = express.Router();

router.get('/', getHoiDongs);
router.get('/:id', getHoiDongById);
router.post('/', createHoiDong);

export default router;