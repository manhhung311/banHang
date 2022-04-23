const express = require('express');
const router = express.Router();
var salesModel = require('../../model/salesModel');
var checkLogin = require('./checkLoginAdmin')


router.get('/',checkLogin,(req,res)=> {
    salesModel.find().exec().then((data)=>{
        if(data){
            res.render('index',{
                linkCategory : false,
                linkUpload : false,
                linkProduct : false,
                linkEdit : false,
                linkSales : true,
                salesData : data
            });
        }
        if(!data){
            res.render('index',{
                linkCategory : false,
                linkUpload : false,
                linkProduct : false,
                linkEdit : false,
                linkSales : true,
                salesData : []
            });
        }
    }).catch(err=>{
        if(err){
            res.status(500).json({result : 'err server'})
        }
    })
})


module.exports = router ;