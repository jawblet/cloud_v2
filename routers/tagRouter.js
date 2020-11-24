const express = require('express');
const router = express.Router();
const tagController = require('./../controllers/tagController');

router.get('/', tagController.getAllTags);
router.post('/', tagController.createTag); 
router.get('/u/:userId', tagController.getTagsByHouse);
router.delete('/', tagController.deleteAllTags);



module.exports = router; 