const express = require('express');
const router = express.Router();
const bodyparser = require('body-parser');
const jwt = require('jsonwebtoken');
const accountModel = require('../model/accountModel');
const checkLoginAcc = require('./checkLoginAcc');
router.use(express.json());



router.get('/',checkLoginAcc,(req,res)=>{
    let token = req.headers.cookie.slice('token='.length)||null ;
    let decode = jwt.verify(token,'N$1*42');
    accountModel.findById(decode._id,(err,data)=> {
        if(data){
            Object.assign(data,{token: "" });
            data.save();
            res.status(200).json({status: true ,result: 'Ok'});
        }
        if(err){
            res.status(500).json({status : false , result : 'errServer'})
        }
    })
})





module.exports = router ;