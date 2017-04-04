/**
 * Created by RFreeman on 2/8/2017.
 */
// reference mongoose
let mongoose = require('mongoose');

// create book schema (class)
var adSchema = new mongoose.Schema({
    title: {
        type: String,
        required: 'Brand is required'
    },
    car: {
        type: String,
        required: 'Model is required'
    },
    price: {
        type: Number,
        min: 0.01
    },
    year: {
        type: Number,
        min: 0
    }
});

// make it public
module.exports = mongoose.model('Ad', adSchema);