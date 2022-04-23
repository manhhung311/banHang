const express = require('express');
const router = express.Router();
var bodyparser = require('body-parser');
var urlencodedParser = bodyparser.urlencoded({extended:false});
var checkLogin = require('./checkLoginAdmin');
var categoryModel = require('../../model/categoryModel');

router.get('/',checkLogin,(req,res)=> {
    categoryModel.find().exec().then(data=>{
        res.render('index',{
            linkCategory : true,
            linkUpload : false,
            linkProduct : false,
            linkEdit : false,
            linkSales : false,
            categoryData : data
    
        });
    })
})

router.post('/',urlencodedParser,checkLogin,(req,res)=>{
    categoryModel.create({
        name : req.body.category
    },(err)=> {
        if(err){
            res.render('addcategory',{
                result : false 
            })
        }
        else{
            res.render('addcategory',{
                result : true 
            });
        }
    })
})


module.exports = router ;