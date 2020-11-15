const express = require('express');
const authController = require('./../controllers/authController');
const router = express.Router();

router.post('/register', authController.registerUser); 
router.get('/logout', authController.logoutUser); 


module.exports = router; 