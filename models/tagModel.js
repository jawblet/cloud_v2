const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema; 

const tagSchema = new Schema ({ 
    tag: {
        type: String,
        require: [true, 'Tags can\'t be empty.'],
        validate: [validator.isAlphanumeric, 'Usernames may only have letters and numbers.']
    },
    color: String,
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    },
    createdOn: {
        type: Date,
        default: Date.now 
    }
});

const Tag = mongoose.model('Tag', tagSchema);
module.exports = Tag;