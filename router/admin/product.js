const express = require('express');
const router = express.Router();
var checkLogin = require('./checkLoginAdmin');
var categoryModel = require('../../model/categoryModel');
var product = require('../../model/product');


router.get('/',checkLogin,(req,res)=> {

        product.find().exec().then((data)=> {
            if(data){
                categoryModel.find().exec().then(dataCategory=>{
                    if(dataCategory){
                        res.render('index',{
                            linkCategory : false,
                            linkUpload : false,
                            linkProduct : true,
                            linkEdit : false,
                            linkSales : false,
                            productData : data,
                            categoryData : dataCategory
                        });
                    }
                })
            }
        })

});




module.exports = router ;