const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema; 

const houseSchema = mongoose.Schema({
    house: {
        type: String,
        required: [true, 'Houses must be named.'],
        lowercase: true,
        unique: [true, 'That name is taken.'],
        validate: [validator.isAlphanumeric, 'House names must have letters and numbers only.'],
        trim: true,
        maxlength: [12, 'House can\'t be more than 12 characters long']
    },
    boardersUnconfirmed: Array,
    boarders: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Houses must have boarders.'],
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],
    posts: [{
        type: Schema.Types.ObjectId,
        ref: 'Post'
    }]
});

const House = mongoose.model('House', houseSchema);
module.exports = House; 