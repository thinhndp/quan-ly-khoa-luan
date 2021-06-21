import express from 'express';

import { getTaskLogReportBySVId } from '../controllers/reportCtrl.js';

const router = express.Router();

router.get('/task-logs/:id', getTaskLogReportBySVId);

export default router;