import express from 'express';

import { getKyThucHiens, createKyThucHien, deleteKyThucHien, getKyThucHienById, updateKyThucHienById } from '../controllers/kyThucHienCtrl.js';

const router = express.Router();

router.get('/', getKyThucHiens);
router.get('/:id', getKyThucHienById);
router.post('/', createKyThucHien);
router.post('/:id', updateKyThucHienById);
router.delete('/:id', deleteKyThucHien);

export default router;