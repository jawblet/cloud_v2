const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const mongoosePaginate = require('mongoose-paginate-v2');

const commentSchema = new Schema({
    comment: String, 
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        ref: 'Post'
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

commentSchema.plugin(mongoosePaginate);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment; 