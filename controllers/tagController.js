const Tag = require('./../models/tagModel');
const House = require('./../models/houseModel');
const functionHandler = require('./genericFunctionController');
const catchAsync = require('./../utils/catchAsync');

exports.getAllTags = functionHandler.getAll(Tag);
exports.getTagsByHouse = functionHandler.getAllByUserId(Tag);
exports.deleteAllTags = functionHandler.deleteAll(Tag);

//create tag and save unique tags to house 
exports.createTag = catchAsync(async(req, res) => {
    const house = await House.findById(req.body.author); //get house that created tag  
    const tag = await Tag.create(req.body); //create tag
    house.tags.addToSet(tag._id);
    await house.save();

    res.status(201).json({
        message: 'created',
        data: {
            tag
        }
    });
});