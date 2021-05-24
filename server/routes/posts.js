import express from 'express';

import { getPosts, createPost, deletePost, getPostById, getPostWSubmitterById,
    updatePostById } from '../controllers/postCtrl.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/with-submitter/:id', getPostWSubmitterById);
router.post('/', createPost);
router.post('/:id', updatePostById);
router.delete('/:id', deletePost);

export default router;