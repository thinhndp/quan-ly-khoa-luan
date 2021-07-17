import express from 'express';

import { getDeTais, getDeTaisWithQuery, getDeTaiById, updateDeTaiById, createManyDeTais, deleteDeTaiById, applyForDeTai,
    getDeTaiBySinhVienId, getDeTaisByKTHId, getDeTaisWithHoiDong, getCurrrentKTHDeTaisByGiangVien, continueApprove, getDeTaisWithNameChange,
    getDeTaisWithPendingApproval, updateNameChange, getCurrrentKTHDeTais, cancelDeTaiApplication, approveMidTerm, undoApproveMidTerm } from '../controllers/deTaiCtrl.js';

const router = express.Router();

router.get('/', getDeTais);
router.post('/q', getDeTaisWithQuery);
router.get('/:id', getDeTaiById);
router.get('/w/get-with-hoi-dong/', getDeTaisWithHoiDong);
router.post('/get-pending-approval/', getDeTaisWithPendingApproval);
router.post('/get-name-change/', getDeTaisWithNameChange);
router.get('/get-by-sinh-vien/:id', getDeTaiBySinhVienId);
router.get('/get-by-ky-thuc-hien/:id', getDeTaisByKTHId);
router.post('/get-active', getCurrrentKTHDeTais);
router.get('/get-active-by-giang-vien/:id', getCurrrentKTHDeTaisByGiangVien);
router.post('/update/:id', updateDeTaiById);
router.post('/create-many/', createManyDeTais);
router.delete('/:id', deleteDeTaiById);
router.post('/apply/', applyForDeTai);
router.post('/cancel/', cancelDeTaiApplication);
router.post('/continue-approve/:id/:sv', continueApprove);
router.post('/update-name-change', updateNameChange);
router.post('/approve-midterm/:id', approveMidTerm);
router.post('/undo-approve-midterm/:id', undoApproveMidTerm);

export default router;