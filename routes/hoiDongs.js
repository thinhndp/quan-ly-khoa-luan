import express from 'express';

import { getHoiDongById, getHoiDongs, createHoiDong, updateHoiDongById, deleteHoiDongById,
  getHoiDongsWithQuery } from '../controllers/hoiDongCtrl.js';

const router = express.Router();

router.get('/', getHoiDongs);
router.post('/q', getHoiDongsWithQuery);
router.get('/:id', getHoiDongById);
router.post('/', createHoiDong);
router.post('/:id', updateHoiDongById);
router.delete('/:id', deleteHoiDongById);

export default router;