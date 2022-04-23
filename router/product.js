const express = require('express');
const router = express.Router();

var productModel = require('../model/product');


router.get('/',(req,res)=> {
    productModel.find().exec().then((data)=>{
        if(data){
            res.json(200).json({status: true , result : 'Ok', data : data});
        }
        if(data){
            res.status(400).json({status : false, result : 'notFound', data:  null});
        }
    }).catch(err=> {
        res.status(500).json({status: false, result : 'errServer', data: null });
    })
})



module.exports = router ;