const mongoose = require('mongoose'); 
const Post = require('../models/postModel');  
const Tag = require('../models/tagModel'); 
const catchAsync = require('../utils/catchAsync');
const functionHandler = require('./genericFunctionController');
exports.getAllPosts = functionHandler.getAll(Post); 
exports.getPostById = functionHandler.getOne(Post, 'tags user');
exports.updatePost = functionHandler.updateOne(Post); 
exports.createPost = functionHandler.create(Post);
exports.updatePost = functionHandler.updateOne(Post);
exports.getPostsByUser = functionHandler.getAllByUserId(Post); 
exports.getPostsByHouse = functionHandler.getAllByHouseId(Post, 'tags user'); 
exports.getPaginatedPosts = functionHandler.paginate(Post);
exports.deleteOnePost = functionHandler.deleteOne(Post);
exports.deletePostsByHouse = functionHandler.deleteAllByHouse(Post);  
exports.deleteAllPosts = functionHandler.deleteAll(Post);  


//get tags used in all posts and unwind
exports.getAllTagsFromPosts = catchAsync(async(req, res) => {
    let match;
    const castId = mongoose.Types.ObjectId(req.params.houseId);

    if(req.params.room) { //check for room param  
        match = { house: castId, room: req.params.room  }
        } else {  match = { house: castId }; 
    } 

    const allTagsFromPosts = await Post.aggregate([ 
        { $match: match }, 
        { 
            $unwind: '$tags' 
        }, 
        { //sometimes tags are saved as null... for now, filter out null tag values 
            $match: { tags: { $ne: null } }
        },
        {
            $lookup: 
            { from: "tags", 
                localField: "tags",
                foreignField: "_id",
                as: "tagObject"
            }
        },
        { //put tag name in main body for sorting/lookup ease 
            $set: { name: "$tagObject.tag" } 
        },
        { $sort: { createdOn: -1 } }
    ]);
    
    res.status(200).json({
        status: 'success',
        data: {
            length: allTagsFromPosts.length,
            allTagsFromPosts
        }
    })  
});

//get tags used in all posts and unwind and then count ea. tag's total use
exports.countTagsFromPosts = catchAsync(async(req, res) => {
    let match;
    let sort;
    const castId = mongoose.Types.ObjectId(req.params.houseId); //cast houseId param to object id

    if(req.params.room) { //check for room param
        match = { house: castId, room: req.params.room }
        } else {  match = { house: castId }; 
    } 

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
        { $match: match }, 
        { $unwind: '$tags' }, 
        { $match: { tags: { $ne: null } } },
        { 
            $group: { // count ea. instance of tag use 
                _id: '$tags',
                countEach: {$sum: 1} 
            }
        },
        { $lookup: 
            {
                from: "tags", // join with tag db  
                localField: "_id",
                foreignField: "_id",
                as: "tagObject"
            }
        },
        {  //put tag name in main body for sorting/lookup ease 
            $set: { name: "$tagObject.tag", createdOn: "$tagObject.createdOn", slug: "$tagObject.slug", color: "$tagObject.color" } 
        },
        { $sort: sort }
    ]);
    


    let postTagSum;
    if(allTags.length !== 0) { // handle no tags
        const postTagsArr = allTags.map(el => el.countEach);
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
            postTagSum = postTagsArr.reduce(reducer); // get total tag use 
        } else {
            postTagSum = 0; 
        }

    res.status(200).json({
        status: 'success',
        data: {
            allTags,
            postTagSum 
        }
    })  
});

//get tags details 
exports.getTagDetails = catchAsync(async(req, res) => {
    const castHouseId = mongoose.Types.ObjectId(req.params.houseId);
    const castTagId =  mongoose.Types.ObjectId(req.params.tagId);

    //get all posts of tag used by house 
    const tag = await Tag.find({ _id: req.params.tagId }); //tag data
    const posts = await Post.find({ house: req.params.houseId, tags: req.params.tagId }); // posts with tag (for excerpts)
    const tagCount = await Post.aggregate([
      { $match: { house: castHouseId, tags: castTagId } 
        },
        { $unwind: '$tags'
        }, 
        { $match: { tags: castTagId } },
       { $group: { 
            _id: null,
            countEach: {$sum: 1} 
        } }
    ]);

    res.status(200).json({ 
        status: 'success',
        data: {
            tag,
            tagCount: tagCount[0].countEach,
            posts,
            postCount: posts.length,
        }
    })  
});


exports.getPostGrid = catchAsync(async(req, res) => {
    const castId = mongoose.Types.ObjectId(req.params.houseId);

    const posts = await Post.aggregate([
        { $match: { house: castId, type: {$ne: 'library'} }
        },
        { $sort: { 'createdOn': -1 } },
        {$project: {content: 0, tags:0 }}
        ]);
    
    const groups = await Post.aggregate([
        { $match: { house: castId, type: {$ne: 'library'} }
        },
            { $group: { _id: '$room' } }
        ]);
    
    //return array of objects --> keys are room id and values are posts 
    const arrs = groups.map(grp => {
        const id = grp._id.toString();
        const subarray = (posts.filter(el => el.room === id));
        return { [id]: subarray }; 
    });

    res.status(200).json({
        length: posts.length,
        status: 'success',
        arrs,
    })                                
});

