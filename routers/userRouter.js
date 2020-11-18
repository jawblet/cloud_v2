const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router(); 

router.get('/', userController.getAllUsers);
router.get('/:username', userController.getUserByUsername);
router.delete('/', userController.deleteAllUsers);
router.delete('/:id', userController.deleteOneUser);

module.exports = router; 
