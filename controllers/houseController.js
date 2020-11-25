const House = require('./../models/houseModel');
const functionHandler = require('./genericFunctionController');
const catchAsync = require('./../utils/catchAsync');

exports.getAllHouses = functionHandler.getAll(House);
exports.createHouse = functionHandler.create(House);
exports.getHouseById = functionHandler.getOne(House, 'boarders'); //return all boarders in house 
exports.deleteOneHouse = functionHandler.deleteOne(House);
exports.deleteAllHouses = functionHandler.deleteAll(House);

//get house by boarder 
exports.getHouseByUser = catchAsync(async(req, res) => {
    const results = await House.find({ boarders: req.params.userId});
    console.log(results);
    res.status(200).json({
        status: 'success',
        data: {
            results
        }
    })  
}); 