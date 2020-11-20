const User = require('./../models/userModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const functionHandler = require('./genericFunctionController');

//function handled by generic handler 
exports.getUserByUsername = functionHandler.getOne(User);
exports.getAllUsers = functionHandler.getAll(User);
exports.deleteOneUser = functionHandler.deleteOne(User);
exports.deleteAllUsers = functionHandler.deleteAll(User);
exports.updateUser = functionHandler.updateOne(User); 

