const mongoose = require('mongoose');
const Post = require('../models/postModel'); 
const catchAsync = require('../utils/catchAsync');
const functionHandler = require('./genericFunctionController');

exports.getAllPosts = functionHandler.getAll(Post); 
exports.getPostById = functionHandler.getOne(Post);
exports.updatePost = functionHandler.updateOne(Post); 
exports.createPost = functionHandler.create(Post);
exports.updatePost = functionHandler.updateOne(Post);
exports.getPostsByUser = functionHandler.getAllByUserId(Post); 
exports.getPostsByHouse = functionHandler.getAllByHouseId(Post, 'tags user'); 
exports.deleteOnePost = functionHandler.deleteOne(Post);
exports.deleteAllPosts = functionHandler.deleteAll(Post);  


//get tags by house id and agg
exports.getTagsFromPosts = catchAsync(async(req, res) => {
    
    let match;
    const castId = mongoose.Types.ObjectId(req.params.houseId); //cast houseId param to object id

    if(req.params.room) { //check for room param  
        match = { house: castId, room: req.params.room }
        } else {  match = { house: castId }; 
    } 

    let sort;

    switch(req.params.sort) { // get sort 
        case 'date': sort = { createdOn: -1 };
        break;
        case 'count': sort = { countEach: -1 };
        break;
        case 'name': sort = { name: 1 };
        break;
        default: sort = { createdOn: -1 };
    }
     
    const allTags = await Post.aggregate([
        {
            $match: match
        }, 
        {
            $unwind: '$tags' //unwind post by tags
        }, 
        {
            $group: {
                _id: '$tags',
                countEach: {$sum: 1} // count ea. instance of tag use 
            }
        },
        {
            $lookup: 
            {
                from: "tags", // join with tag db  
                localField: "_id",
                foreignField: "_id",
                as: "tagObject"
            }
        },
        {
            $set: { name: "$tagObject.tag", createdOn: "$tagObject.createdOn" } //put tag name in main body for sorting/lookup ease 
        },
        {
            $sort: sort 
        }
    ]);

    const postTagsArr = allTags.map(el => el.countEach);
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const postTagSum = postTagsArr.reduce(reducer); // get total tag use 

    res.status(200).json({
        status: 'success',
        data: {
            allTags,
            postTagSum 
        }
    })  
});

//get tags and unwind
exports.getAllTagsFromPosts = catchAsync(async(req, res) => {
    
    let match;
    const castId = mongoose.Types.ObjectId(req.params.houseId); //cast houseId param to object id

    if(req.params.room) { //check for room param  
        match = { house: castId, room: req.params.room }
        } else {  match = { house: castId }; 
    } 

    const allTagsFromPosts = await Post.aggregate([
        {
            $match: match
        }, 
        {
            $unwind: '$tags' //unwind post by tags
        }, 
        {
            $lookup: 
            {
                from: "tags", // join with tag db  
                localField: "tags",
                foreignField: "_id",
                as: "tagObject"
            }
        },
        {
            $set: { name: "$tagObject.tag" } //put tag name in main body for sorting/lookup ease 
        },
        {
            $sort: { createdOn: -1 }
        }
    ]);

    res.status(200).json({
        status: 'success',
        data: {
            allTagsFromPosts
        }
    })  
});



