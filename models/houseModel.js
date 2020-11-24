const mongoose = require('mongoose');
const Schema = mongoose.Schema; 

const houseSchema = mongoose.Schema({
    house: {
        type: String,
        required: [true, 'Houses must be named.'],
        lowercase: true,
        unique: [true, 'That name is taken.'],
        maxLength: [12, 'House names should be 12 characters or less']
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