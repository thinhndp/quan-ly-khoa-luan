import express from 'express';

import { getUsersWithQuery, getUsers, createUser, deleteUser, getUserById,
  updateUserById } from '../controllers/userCtrl.js';

const router = express.Router();

router.get('/', getUsers);
router.post('/q', getUsersWithQuery);
router.get('/:id', getUserById);
router.post('/', createUser);
router.post('/:id', updateUserById);
router.delete('/:id', deleteUser);

export default router;