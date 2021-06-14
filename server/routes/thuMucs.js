import express from 'express';

import { getThuMucs, getThuMucById, createThuMuc,
    updateThuMucById, deleteThuMuc, createFilesInFolder,
    getFilesOfFolder, getFilesOfFolderWithQuery } from '../controllers/thuMucCtrl.js';

const router = express.Router();

router.get('/', getThuMucs);
router.get('/:id', getThuMucById);
router.post('/', createThuMuc);
router.post('/:id', updateThuMucById);
router.post('/:id/create-files', createFilesInFolder);
router.get('/:id/get-files', getFilesOfFolder);
router.post('/:id/get-files/q', getFilesOfFolderWithQuery);
router.delete('/:id', deleteThuMuc);

export default router;