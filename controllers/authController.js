const User = require('./../models/userModel');
const AppError = require('./../utils/AppError');
const catchAsync = require('./../utils/catchAsync');
const jwt = require('jsonwebtoken');
const { promisify } = require('util');

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
};

exports.checkUser = catchAsync(async(req, res, next) => {
    let currentUser;
    if (req.cookies.jwt) {
        const token = req.cookies.jwt;
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
        currentUser = await User.findById(decoded.id);
      } else {
          currentUser =  null;
      }    

      res.status(200).send({ currentUser });
});


exports.logoutUser = catchAsync(async (req, res) => {
    console.log('logout!')
    
    res.cookie('jwt', 'loggedout', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });
    
    res.status(200).send('user is logged out');
  });

/*
    {
        username: 'juliAA',
        password: '12345678'
      }     
*/