const Tag = require('../models/tagModel');
const House = require('../models/houseModel');
const functionHandler = require('./genericFunctionController');
const catchAsync = require('./../utils/catchAsync');

exports.getAllTags = functionHandler.getAll(Tag);
exports.getTagById = functionHandler.getOne(Tag);
exports.getTagBySlug = functionHandler.getOneBySlug(Tag);
exports.getTagsByUser = functionHandler.getAllByUserId(Tag);
exports.getTagsByHouse = functionHandler.getAllByHouseId(Tag);
exports.deleteAllTags = functionHandler.deleteAll(Tag);

//create tag and save unique tags to house  
exports.createTag = catchAsync(async(req, res) => {    
    //check if house has a tag with this name
    const checkTag = await Tag.find({house: req.body.house, 
        tag: req.body.tag });
    
    if(checkTag.length !== 0) {
        res.status(200).json({
            message: 'tag already exists',
            data: { checkTag }
        })
        return null; 
    } 

    const tag = await Tag.create(req.body); //create tag
        const house = await House.findById(req.body.house); //get house that created tag  
        house.tags.addToSet(tag._id); 
        await house.save();

        res.status(201).json({
            message: 'created',
            data: { tag }
        });
});