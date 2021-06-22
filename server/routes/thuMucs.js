import express from 'express';

import { getThuMucs, getThuMucById, createThuMuc,
    updateThuMucById, deleteThuMuc, createFilesInFolder,
    getFilesOfFolder, getFilesOfFolderWithQuery, getThuMucsWithQuery, getFilesBySinhVienId } from '../controllers/thuMucCtrl.js';

const router = express.Router();

router.get('/', getThuMucs);
router.post('/q', getThuMucsWithQuery);
router.get('/:id', getThuMucById);
router.post('/get-files-by-sinh-vien/:id', getFilesBySinhVienId);
router.post('/', createThuMuc);
router.post('/:id', updateThuMucById);
router.post('/:id/create-files', createFilesInFolder);
router.get('/:id/get-files', getFilesOfFolder);
router.post('/:id/get-files/q', getFilesOfFolderWithQuery);
router.delete('/:id', deleteThuMuc);

export default router;