const catchAsync = require('./../utils/catchAsync');

//get one by username ?
exports.getOne = (Model, populateOpts) => catchAsync(async (req, res) => {
    let query = await Model.findOne({username: req.params.username});
    if(populateOpts) query = query.populate(populateOpts);
    const doc = await query; 

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    });
});

//get all 
exports.getAll = (Model) => catchAsync(async(req, res) => {
    let docs = await Model.find();
    res.status(200).json({
        status: 'success',
        data: {
            docs
        }
    });
});

//update one 
exports.updateOne = (Model) => catchAsync(async(req, res) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true
    });

    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })   
});


//delete one by id 
exports.deleteOne = (Model) => catchAsync(async(req, res) => {
    await Model.findOneAndDelete(req.params.id); 
    res.status(204).json({
        status: 'deleted',
        data: null
    })
});

//delete all
exports.deleteAll = (Model) => catchAsync(async(req, res) => {
    await Model.deleteMany(); 
    res.status(204).json({
        status: 'deleted',
        data: null
    })
});
