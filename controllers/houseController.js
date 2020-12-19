const House = require('./../models/houseModel');
const functionHandler = require('./genericFunctionController');
const catchAsync = require('./../utils/catchAsync');
const sendEmail = require('../utils/sendEmail');
const AppError = require('../utils/AppError');
 
exports.getAllHouses = functionHandler.getAll(House);
exports.updateHouse = functionHandler.updateOne(House);
exports.getHouseById = functionHandler.getOne(House, 'boarders'); //return all boarders in house 
exports.deleteOneHouse = functionHandler.deleteOne(House);
exports.deleteAllHouses = functionHandler.deleteAll(House);
exports.createHouse = functionHandler.create(House);

//send confirm email
exports.sendConfirmEmail = catchAsync(async(req, res) => {
    await sendEmail(req.body);

    res.status(200).json({
        status: 'success',
        message: 'email sent'
    });
});

//get house by boarder 
exports.getHouseByUser = catchAsync(async(req, res) => {
    const results = await House.find({ boarders: req.params.userId});

    res.status(200).json({
        status: 'success',
        data: {
            results
        }
    })  
}); 

//get house by house name for user confirmation 
exports.getHouseByHouseName = catchAsync(async(req, res, next) => {
    const results = await House.find({ house: req.params.houseName});
    if(!results.length) {
        return next(new AppError('That house isn\'t on our map', 404));
      }

    res.status(200).json({
        status: 'success',
        data: {
            results
        }
    })  
}); 
 