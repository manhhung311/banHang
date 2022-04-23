const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const category = new Schema({
    name : String,
    idProduct : [{type: mongoose.Types.ObjectId}]
})

const categoryModel = mongoose.model('category',category);

module.exports = categoryModel ;