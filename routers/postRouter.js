const express = require('express');
const postController = require('./../controllers/postController');
const router = express.Router();
router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById); 
router.post('/', postController.createPost);
router.get('/u/:userId', postController.getPostsByUser);
router.get('/h/:houseId/:room?', postController.getPostsByHouse);
router.get('/tags/:houseId/:sort?', postController.countTagsFromPosts); //count tags for 
router.get('/allTags/:houseId/:room?', postController.getAllTagsFromPosts); //
router.get('/details/:houseId/:tagId', postController.getTagDetails); // get tag details for tag 
router.put('/:id', postController.updatePost);
router.delete('/', postController.deleteAllPosts);
router.delete('/:id', postController.deleteOnePost);

module.exports = router; 