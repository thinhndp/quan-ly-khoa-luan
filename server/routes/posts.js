import express from 'express';

import { getPosts, createPost, deletePost, getPostById } from '../controllers/postCtrl.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.delete('/:id', deletePost);

export default router;