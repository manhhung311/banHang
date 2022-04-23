const  express = require('express');
const router = express.Router();
var accountModel = require('../model/accountModel');
var productModel = require('../model/product.js');
var checkLogin = require('./checkLoginAcc');
var jwt = require('jsonwebtoken')

router.get('/:id',checkLogin,(req,res)=>{
    let id = req.params.id ;
    let token = req.headers.authorization.split(' ')[1] ;
    let decode = jwt.verify(token,'N$1*42');
    productModel.findById(id,(err,data)=>{
        if(data){
            accountModel.findOneAndUpdate(
                {_id: decode._id},
                {$push : {cart : data._id} },
                (err)=>{
                    if(err){
                        res.status(500).json({status: false , result : 'errServer',cart : null});
                    }

                }

            )
            res.status(200).json({status: true , result : 'Ok',cart : data});

        }
        if(!data){
            res.status(404).json({status: false , result : 'noId',cart : null});
        }
        if(err){
            res.status(500).json({status: false, result : 'errServer', cart : null })
        }
    })

});

module.exports =  router ;