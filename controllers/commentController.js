const Comment = require('../models/commentModel');
const catchAsync = require('../utils/catchAsync');
const functionHandler = require('./genericFunctionController');

exports.createComment = functionHandler.create(Comment);
exports.deleteAllComments = functionHandler.deleteAll(Comment);
exports.deleteOneComment = functionHandler.deleteOne(Comment);

exports.getCommentsByPost = catchAsync(async(req, res) => {
    const comments = await Comment.find({ post: req.params.postId })
                            .populate('user');

    res.status(200).json({
        status: 'success',
        data: {
            comments
        }
    })
});