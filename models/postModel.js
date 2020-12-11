const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const getCurrentDate = () => {
    let date = new Date().toLocaleDateString('en', 
                    { day: "numeric", 
                    month: "short", 
                    year: "numeric" });
    return date;
}
 
const postSchema = new Schema({ 
    type: String, 
    content : {
        type: String,
        required: [true, 'Posts must have some content to be added to a room.']
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
    room: String, 
    date: {
        type: String,
        default: getCurrentDate()
    },
    createdOn: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post; 