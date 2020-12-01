const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController');
const sort = require('../middleware/sort');

router.get('/', tagController.getAllTags);
router.post('/', tagController.createTag); 
router.get('/:id', tagController.getTagById); 
router.get('/u/:userId', tagController.getTagsByUser);
router.get('/h/:houseId', tagController.getTagsByHouse);
router.delete('/', tagController.deleteAllTags);

/* sorting and filtering */
//sort A - Z 
router.route('/AtoZ/:houseId')
    .get(sort.aliasAtoZ, tagController.getTagsByHouse);
//get last 3 
router.route('/last3/:houseId')
    .get(sort.lastThree, tagController.getTagsByHouse);


module.exports = router; 