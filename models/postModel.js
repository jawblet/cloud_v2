const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    type: String, 
    content : {
        type: String,
        required: [true, 'Nothing to add.']
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    comment: String,
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post; 