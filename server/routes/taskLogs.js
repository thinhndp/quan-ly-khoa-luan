import express from 'express';

import { getTaskLogs, createTaskLog, deleteTaskLog, getTaskLogById,
  updateTaskLogById, getTaskLogsWithQuery } from '../controllers/taskLogCtrl.js';

const router = express.Router();

router.get('/', getTaskLogs);
router.post('/q', getTaskLogsWithQuery);
router.get('/:id', getTaskLogById);
router.post('/', createTaskLog);
router.post('/:id', updateTaskLogById);
router.delete('/:id', deleteTaskLog);

export default router;