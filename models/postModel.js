const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    type: String, 
    content : {
        type: String,
        required: [true, 'Nothing to add.']
    },
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    tags: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Tag' 
    }
    ],
    comment: String,
    room: String, 
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post; 