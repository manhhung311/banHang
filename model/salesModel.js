const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const sales = new Schema({
    idProduct : [{type: mongoose.Types.ObjectId}],
    idAccount : {type: mongoose.Types.ObjectId},
    date : String,
    amount : Number
})

const salesModel = mongoose.model('sales',sales);

module.exports = salesModel ;