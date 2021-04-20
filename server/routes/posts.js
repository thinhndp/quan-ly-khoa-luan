import express from 'express';

import { getPosts, createPost, deletePost, getPostById, updatePostById } from '../controllers/postCtrl.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.post('/', createPost);
router.post('/:id', updatePostById);
router.delete('/:id', deletePost);

export default router;