const Post = require('../models/postModel');  
const mongoose = require('mongoose'); 


const unwindAndCount = (async(req, res, next) => {
    const castId = mongoose.Types.ObjectId(req.params.id); 

    let tagAgg = await Post.aggregate([
        { $match: { _id: castId } },
        { $unwind: '$tags' }, 
        { $match: { tags: { $ne: null } } },
        { $group: {
                _id: '$tags', 
                countEach: {$sum: 1} 
            } },
        { $lookup: 
            {
                from: "tags", 
                localField: "_id",
                foreignField: "_id",
                as: "tagObject"
            }
        },
        { $set: { name: "$tagObject.tag", createdOn: "$tagObject.createdOn" } },
    ]);

    req.body.count = tagAgg; 

    next();
});

module.exports = unwindAndCount;
