const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const acc = new Schema({
    usename:String,
    name: String,
    password: String,
    address: String,
    numberPhone: String,
    birth: String,
    errpass: Number,
    token : String,
    cart: [{type: mongoose.Types.ObjectId}],
    buyProducts: [{type: mongoose.Types.ObjectId}]

});

const accountModel = mongoose.model('account',acc);


module.exports = accountModel ;