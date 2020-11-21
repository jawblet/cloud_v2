const express = require('express');
const userController = require('./../controllers/userController');
const router = express.Router(); 

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
//router.get('/:username', userController.getUserByUsername);
router.delete('/', userController.deleteAllUsers);
router.delete('/:id', userController.deleteOneUser);
router.put('/:id', userController.updateUser); // change to patch? 


module.exports = router; 
