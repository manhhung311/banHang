const express = require('express');
const productModel = require('../model/product');
const router = express.Router();


router.get('/:id', (req,res)=> {
    var id = req.params.id ;
    productModel.findById(id).exec().then((data)=> {
        if(data){
            res.status(200).json({status: true, result : 'Ok', data: data});
        }
        if(!data){
            res.status(404).json({status: false, result : 'idNotFound', data : null}) ;
        }
    }).catch(err=>{
        if(err){
            res.status(500).json({status : false, result : 'errServer', data: null});
        }
    })
})




module.exports = router ;