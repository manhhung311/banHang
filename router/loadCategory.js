const express = require('express');
const router = express.Router();
var categoryModel = require('../model/categoryModel');



router.get('/:id',(req,res)=> {
    var id = req.params.id ;
    categoryModel.findById(id).exec().then((data)=>{
        if(data){
            res.status(200).json({status : true ,result : "Ok", data : data});
        }
        if(!data){
            res.status(404).json({status : false , result : 'fileNotFound',data : null});
        }
    }).catch(err=>{
        if(err){
            res.status(500).json({status : false , result : 'errServer', data : null})
        }
    })
})


module.exports = router ;