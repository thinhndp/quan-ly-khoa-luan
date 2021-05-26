import express from 'express';

import { getGiangViens, createGiangVien, createManyGiangViens, updateGiangVienById,
  deleteGiangVienById, upsertManyGiangViens, getGiangVienById, getGiangVienByEmail }
  from '../controllers/giangVienCtrl.js';

const router = express.Router();

router.get('/', getGiangViens);
router.get('/:id', getGiangVienById);
router.post('/get-by-email', getGiangVienByEmail);
router.post('/', createGiangVien);
router.post('/create-many/', createManyGiangViens);
router.post('/upsert-many/', upsertManyGiangViens);
router.post('/:id', updateGiangVienById);
router.delete('/:id', deleteGiangVienById);

export default router;