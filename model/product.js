const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const product = new Schema({
    name : String,
    price : Number,
    // sale : Number,
    intro : String,
    // properties : String,
    img : String,
    total : Number,
    category : {type: mongoose.Types.ObjectId}
    // view : Number
})

const productModel = mongoose.model('product',product);

module.exports = productModel ;