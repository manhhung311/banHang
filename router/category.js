const express = require('express');
const router = express.Router();
var categoryModel = require('../model/categoryModel');



router.get('/',(req,res)=> {
    categoryModel.find().exec().then((data)=>{
        if(data){
            console.log(data);
            res.status(200).json({status :true , result : 'Ok', data: data});
        }
        if(!data){
            res.status(404).json({stattus : false, result : 'notFound', data : null});
        }
    }).catch(err=>{
        if(err){
            res.status(500).json({status: false, result : 'err server',data : null})
        }
    })
})


module.exports = router ;