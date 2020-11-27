const Post = require('./../models/postModel');
const catchAsync = require('./../utils/catchAsync');
const functionHandler = require('./genericFunctionController');

exports.getAllPosts = functionHandler.getAll(Post); 
exports.getPostById = functionHandler.getOne(Post);
exports.updatePost = functionHandler.updateOne(Post); 
exports.createPost = functionHandler.create(Post);
exports.updatePost = functionHandler.updateOne(Post);
exports.getPostsByUser = functionHandler.getAllByUserId(Post); 
exports.getPostsByHouse = functionHandler.getAllByHouseId(Post); 
exports.deleteOnePost = functionHandler.deleteOne(Post);
exports.deleteAllPosts = functionHandler.deleteAll(Post); 