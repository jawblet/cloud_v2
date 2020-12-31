const express = require('express');
const postController = require('./../controllers/postController');
const router = express.Router();
//const unwindAndCount = require('../utils/unwindAndCount');

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostById); 
router.post('/', postController.createPost);
router.get('/u/:userId', postController.getPostsByUser);
router.get('/h/:houseId/:room?', postController.getPostsByHouse); 
router.get('/tags/:houseId/:sort?/:room?', postController.countTagsFromPosts); //count tags for tag manager 
router.get('/allTags/:houseId/:room?', postController.getAllTagsFromPosts); 
router.get('/details/:houseId/:tagId', postController.getTagDetails); // get tag details for tag 
router.put('/:id', postController.updatePost);
router.delete('/', postController.deleteAllPosts);
router.delete('/:id', postController.deleteOnePost);
router.delete('/h/:houseId/:room?', postController.deletePostsByHouse); 

module.exports = router; 