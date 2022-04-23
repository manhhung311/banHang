const express = require('express');
const app = express();

const mongoose = require('mongoose');
var bodyparser = require('body-parser')
var urlencodedParser = bodyparser.urlencoded({extended: false});
mongoose.connect('mongodb+srv://manhhung313:5K1J53miOosdjAr8@cluster0.xuojh.mongodb.net/Data?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function(){
    console.log('connect database');
}).catch(function(err){console.error(`ket noi data that bai  ${err}`)});

app.use(express.static(__dirname + '/views'));
app.use(express.static(__dirname + '/media'));
app.use(express.static(__dirname + '/html'));
app.use(express.json());
app.set('view engine','ejs');

var product = require('./router/product')
var register = require('./router/register');
var loadBanner = require('./router/loadBanner');
var cart = require('./router/cart');
var login = require('./router/login');
var loadProduct = require('./router/loadproduct');
var loadCategory = require('./router/loadCategory');
var category = require('./router/category');
var addcategory = require('./router/admin/addcategory');
var upload = require('./router/admin/uploadProduct');
var loginAdmin = require('./router/admin/adminLogin');
var buy = require('./router/buy');
var addCart = require('./router/addCart');
var buyCart = require('./router/buycart');
var edit = require('./router/admin/edit')
var logoutAdmin = require('./router/admin/logoutAdmin');
var productAdmin = require('./router/admin/product');
var logout = require('./router/logout');
var sales = require('./router/admin/sales')

app.use('/product',product);
app.use('/login',login);
app.use('/register',register);
app.use('/banner',loadBanner);
app.use('/cart',cart);
app.use('/loadproduct',loadProduct);
app.use('/loadcategory',loadCategory);
app.use('/category',category);
app.use('/addcategory',addcategory);
app.use('/upload',upload);
app.use('/adminlogin',loginAdmin);
app.use('/buy',buy);
app.use('/addcart',addCart);
app.use('/buycart',buyCart);
app.use('/edit',edit);
app.use('/logoutadmin',logoutAdmin);
app.use('/productadmin',productAdmin);
app.use('/logout',logout);
app.use('/sales',sales);




var port = process.env.PORT || 8000

app.listen(port,(err)=>{
    if(!err){
        console.log('connect server port '+ port);
    }
    else console.log('ket noi that bai');
})