const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const layerSchema = mongoose.Schema({
    label: {
        type: String,
        required: true
    },
    slug: String,
    description: {
        type: String,
        default: "//"
    },
    zone: String,
    color: String,
    house: {
        type: Schema.Types.ObjectId,
        ref: 'House'
    }
});

const Layer = mongoose.model('Layer', layerSchema);
module.exports = Layer; 