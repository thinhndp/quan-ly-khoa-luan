import express from 'express';

import { getSinhViens, createSinhVien, createManySinhViens } from '../controllers/sinhVienCtrl.js';

const router = express.Router();

router.get('/', getSinhViens);
router.post('/', createSinhVien);
router.post('/create-many/', createManySinhViens);

export default router;