const User = require('./../models/userModel'); 
const functionHandler = require('./genericFunctionController');

//function handled by generic handler 
exports.getUserById = functionHandler.getOne(User, 'house');
exports.getAllUsers = functionHandler.getAll(User);
exports.deleteOneUser = functionHandler.deleteOne(User);
exports.deleteAllUsers = functionHandler.deleteAll(User);
exports.updateUser = functionHandler.updateOne(User); 

