const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const acc = new Schema({
    use:String,
    name: String,
    password: String,
    token : String

});

const accountAdminModel = mongoose.model('accountadmin',acc);


module.exports = accountAdminModel ;