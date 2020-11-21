const express = require('express');
const postController = require('./../controllers/postController');
const router = express.Router();

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.get('/u/:userId', postController.getPostsByUser);
router.put('/:id', postController.updatePost);

module.exports = router; 