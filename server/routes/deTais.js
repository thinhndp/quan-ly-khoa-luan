import express from 'express';

import { getDeTais, getDeTaisWithQuery, getDeTaiById, updateDeTaiById, createManyDeTais, deleteDeTaiById, applyForDeTai,
    getDeTaiBySinhVienId, getDeTaisByKTHId, getDeTaisWithHoiDong, getCurrrentKTHDeTaisByGiangVien, continueApprove,
    getDeTaisWithPendingApproval, updateNameChange } from '../controllers/deTaiCtrl.js';

const router = express.Router();

router.get('/', getDeTais);
router.post('/q', getDeTaisWithQuery);
router.get('/:id', getDeTaiById);
router.get('/w/get-with-hoi-dong/', getDeTaisWithHoiDong);
router.post('/get-pending-approval/', getDeTaisWithPendingApproval);
router.get('/get-by-sinh-vien/:id', getDeTaiBySinhVienId);
router.get('/get-by-ky-thuc-hien/:id', getDeTaisByKTHId);
router.get('/get-active-by-giang-vien/:id', getCurrrentKTHDeTaisByGiangVien);
router.post('/update/:id', updateDeTaiById);
router.post('/create-many/', createManyDeTais);
router.delete('/:id', deleteDeTaiById);
router.post('/apply/', applyForDeTai);
router.post('/continue-approve/:id/:sv', continueApprove);
router.post('/update-name-change', updateNameChange);

export default router;