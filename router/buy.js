var express = require('express');
var router = express.Router();
var checkLogin = require('./checkLoginAcc');
var productModel = require('../model/product');
var accountModel = require('../model/accountModel');
var salesModel = require('../model/salesModel');
var jwt = require('jsonwebtoken')


var addSales = (idAcc, arrIdProduct, amount)=>{
    var today = new Date;
    salesModel.create({
        idProduct : arrIdProduct,
        idAccount : idAcc,
        Data : today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear(),
        amount : amount 
    }) ;
}

var updateAccModel = (idProduct,idAcc)=> {
    accountModel.findById(idAcc,(err,data)=> {
        if(data){
            data.buyProducts.push(idProduct);
            data.save();
        }

    })

}


router.post('/',checkLogin, (req,res)=> {
    var id = req.body.id;
    let token = req.headers.authorization.split(' ')[1]||null ;
    var decode = jwt.verify(token,'N$1*42');
    if(id){
        productModel.findById(id,(err,data)=> {
            if(data){
                updateAccModel(data._id,decode._id);
                addSales(decode._id,data._id,data.amount);

                res.status(200).json({status : true , result : 'Ok'});
               
            }
            if(!data){
                res.status(404).json({status : false , result : 'errId'});
            }
            if(err){
                res.status(500).json({status : false , result : 'errServer'});
            }
            
        })
    }
    else{
        res.status(403).json({status: false, result : 'noId'})
    }
})



module.exports = router ;
