const mongoose = require('mongoose');
const Schema = mongoose.Schema ;

const banner = new Schema({
    name : String,
    img : [{type: String}]
})

const bannerModel = mongoose.model('banner',banner);

module.exports = bannerModel ;