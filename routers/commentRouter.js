const express = require('express');
const commentController = require('./../controllers/commentController');
const router = express.Router();

router.post('/', commentController.createComment); 
router.get('/:postId', commentController.getCommentsByPost); 
router.get('/paginate/:postId', commentController.paginateCommentsByPost); 
router.delete('/', commentController.deleteAllComments); 
router.delete('/:id', commentController.deleteOneComment); 

module.exports = router; 
