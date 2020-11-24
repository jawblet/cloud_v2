const catchAsync = require('./../utils/catchAsync');

//get one by id
exports.getOne = (Model, populateOpts) => catchAsync(async (req, res) => {
    let query = await Model.findOne({ _id: req.params.id });
    if(populateOpts) query = query.populate(populateOpts).execPopulate();
    const doc = await query; 
    console.log(populateOpts);
    res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    });
});

//get tag, post by user or house or boarders
exports.getAllByUserId = (Model) => catchAsync(async(req, res) => {
    const results = await Model.find({ user: req.params.userId});
    console.log(results);
    res.status(200).json({
        status: 'success',
        data: {
            results
        }
    })  
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

//create one
exports.create = (Model) => catchAsync(async(req, res) => {
    const doc = await Model.create(req.body); 

    res.status(201).json({
        status: 'success',
        data: {
            doc
        }
    })
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