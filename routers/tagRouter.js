const express = require('express');
const router = express.Router();
const tagController = require('../controllers/tagController'); 
const sort = require('../middleware/sort');

router.get('/', tagController.getAllTags); 
router.post('/', tagController.createTag); 
router.get('/:id', tagController.getTagById); 
router.get('/s/:slug', tagController.getTagBySlug); 
router.get('/u/:userId', tagController.getTagsByUser);
router.get('/h/:houseId', tagController.getTagsByHouse);
router.delete('/', tagController.deleteAllTags);

/* sorting and filtering */
router.route('/AtoZ/:houseId') //sort A - Z 
    .get(sort.aliasAtoZ, tagController.getTagsByHouse);

router.route('/last3/:houseId') //get last 3 
    .get(sort.lastThree, tagController.getTagsByHouse);

module.exports = router; 