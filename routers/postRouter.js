const express = require('express');
const postController = require('./../controllers/postController');
const router = express.Router();
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById);
router.post('/', postController.createPost);
router.get('/u/:userId', postController.getPostsByUser);
router.get('/h/:houseId/:room?', postController.getPostsByHouse);
router.get('/tags/:houseId/:sort?', postController.getTagsFromPosts);
router.get('/allTags/:houseId/:room?', postController.getAllTagsFromPosts);
router.put('/:id', postController.updatePost);
router.delete('/', postController.deleteAllPosts);
router.delete('/:id', postController.deleteOnePost);

module.exports = router; 