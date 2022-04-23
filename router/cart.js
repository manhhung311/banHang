const  express = require('express');
const router = express.Router();
var accountModel = require('../model/accountModel');
var checkLogin = require('./checkLoginAcc');
var jwt = require('jsonwebtoken')

router.get('/',checkLogin,(req,res)=>{
    let token = req.headers.authorization.split(' ')[1] ;
    console.log(token);
    let decode = jwt.verify(token,'N$1*42');
    accountModel.findById(decode._id, (err,data)=> {
        if(data){
            res.status(200).json({status: true, result : 'Ok', cart : data.cart});
        }
        if(!data){
            res.status(404).json({status: false, result : 'noCart', cart : null});
        }
        if(err){
            res.status(500).json({status: false, result : 'errServer', cart : null })
        }

    })
});

module.exports =  router ;