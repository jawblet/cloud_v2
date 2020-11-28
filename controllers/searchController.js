const catchAsync = require('../utils/catchAsync');
const Tag = require('../models/tagModel');

exports.search = catchAsync(async(req, res) => {
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        const results = await Tag.find({tag: regex, house: req.params.houseId});
        console.log(results);

        res.status(200).json({
            message: 'success',
                data: {
                    results
                }
            })
        }
});

function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}