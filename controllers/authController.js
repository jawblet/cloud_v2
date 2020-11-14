const User = require('./../models/userModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

//add catchAsync here lol 
const signToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createUserToken = async(user, code, req, res) => {
    const token = signToken(user._id);

    //set expiry to 1 month 
    let d = new Date();
    d.setDate(d.getDate() + 30);

    //cookie settings 
    res.cookie('jwt', token, {
        expires: d,
        httpOnly: true,
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https', 
        sameSite: 'none'
    });

    //remove user password from output
    user.password = undefined; 
    res.status(code).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

exports.registerUser = async(req, res, next) => {
    //pass in request data here to create user from user schema 
        try {
            const newUser = await User.create({
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                passwordConfirm: req.body.passwordConfirm
            });

          createUserToken(newUser, 201, req, res);
    //if user can't be created, throw an error 
        } catch(err) {
            next(err);
    }
}

exports.checkUser = catchAsync(async(req, res, next) => {
    let token;
    if (req.cookies.jwt) {
        token = req.cookies.jwt;
      }    

    if (!token) {
        return next(
          new AppError('You are not logged in! Please log in to get access.', 401)
        );
    }

    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    const currentId = decoded.id;

    res.status(200).json({
        status: 'success',
        data: {
            currentId
        }
      });

});