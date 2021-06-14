import express from 'express';

import { getPosts, createPost, deletePost, getPostById, getPostWSubmitterById,
    updatePostById, getPublicPosts, getPrivatePosts, getPostsWithQuery } from '../controllers/postCtrl.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/q', getPostsWithQuery);
router.get('/public', getPublicPosts);
router.get('/private', getPrivatePosts);
router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/with-submitter/:id', getPostWSubmitterById);
router.post('/', createPost);
router.post('/:id', updatePostById);
router.delete('/:id', deletePost);

export default router;